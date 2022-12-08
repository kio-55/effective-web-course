import {
  observable,
  action,
  computed,
  makeObservable,
  runInAction
} from 'mobx';

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
      });
    } catch (error) {
      console.error(error);
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
      });
    } catch (error) {
      console.error(error);
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
      });
    } catch (error) {
      console.error(error);
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
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}

const comicsStore = new ComicsStore();

export default comicsStore;
