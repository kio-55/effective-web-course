import { ResultStatusType } from 'types/helpers';
import { observable, action, makeObservable, runInAction } from 'mobx';

import api from '../api';

import { comicType } from '../types/comics';

class ComicsStore {
  @observable
  comics: comicType[] = [];

  @observable
  comic: comicType | undefined;

  @observable
  comicsCount: number = 0;

  @observable
  comicsCurentSlide: number = 0;

  @observable
  loading: boolean = false;

  @observable
  limit: number = 20;

  @observable
  error: ResultStatusType = 'success';

  constructor() {
    makeObservable(this);
  }

  @action
  getComicsList = async (): Promise<void> => {
    try {
      this.loading = true;

      const comics = await api.comics.getComicsList(this.limit);
      runInAction(() => {
        this.comicsCount = comics.totalCount;
        this.comics = comics.comics;
        this.error = 'success';
      });
    } catch (error) {
      console.error(error);
      runInAction(() => {
        this.error = 'error';
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  @action
  getComicsById = async (id: string): Promise<void> => {
    try {
      this.loading = true;
      this.comic = undefined;

      const comic = await api.comics.getComicsById(id, this.limit);
      runInAction(() => {
        this.comic = comic;
        this.error = 'success';
      });
    } catch (error) {
      console.error(error);
      runInAction(() => {
        this.error = 'error';
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  @action
  getComicsListByIds = async (ids: string[]): Promise<void> => {
    try {
      this.loading = true;

      const comics: comicType[] = [];
      console.log(ids);
      for (const id in ids) {
        const comic = await api.comics.getComicsById(ids[id], this.limit);
        comics.push(comic);
      }

      runInAction(() => {
        this.comicsCount = comics.length;
        this.comics = comics;
        this.error = 'success';
      });
    } catch (error) {
      console.error(error);
      runInAction(() => {
        this.error = 'error';
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  @action
  getComicsWithOffset = async (offset: number): Promise<void> => {
    try {
      this.loading = true;
      const comics = await api.comics.getComicsWithOffset(offset, this.limit);
      runInAction(() => {
        this.comicsCurentSlide = offset;
        this.comics = comics;
        this.error = 'success';
      });
    } catch (error) {
      console.error(error);
      runInAction(() => {
        this.error = 'error';
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  @action
  getComicsWithName = async (offset: number, title: string): Promise<void> => {
    try {
      this.loading = true;
      const comics = await api.comics.getComicsByName(
        offset,
        title,
        this.limit
      );
      runInAction(() => {
        this.comicsCurentSlide = offset;
        this.comics = comics.comics;
        this.comicsCount = comics.totalCount;
        this.error = 'success';
      });
    } catch (error) {
      console.error(error);
      runInAction(() => {
        this.error = 'error';
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}

const comicsStore = new ComicsStore();

export default comicsStore;
