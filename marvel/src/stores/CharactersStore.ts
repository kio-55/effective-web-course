import { observable, action, makeObservable, runInAction } from 'mobx';

import api from '../api';

import { CharacterType } from '../types/comics';
import { ResultStatusType } from 'types/helpers';

class CharactersStore {
  @observable
  characters: CharacterType[] = [];

  @observable
  character: CharacterType | undefined;

  @observable
  charactersCount: number = 0;

  @observable
  charactersCurentSlide: number = 0;

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
  getCharactersList = async (): Promise<void> => {
    try {
      this.loading = true;

      const characters = await api.characters.getCharactersList(this.limit);
      runInAction(() => {
        this.charactersCount = characters.totalCount;
        this.characters = characters.characters;
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
  getCharactersListByIds = async (ids: string[]): Promise<void> => {
    try {
      this.loading = true;

      const characters: CharacterType[] = [];
      console.log(ids);
      for (const id in ids) {
        const character = await api.characters.getCharacterById(
          ids[id],
          this.limit
        );
        characters.push(character);
      }

      runInAction(() => {
        this.charactersCount = characters.length;
        this.characters = characters;
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
  getCharacterById = async (id: string): Promise<void> => {
    try {
      this.loading = true;
      this.character = undefined;

      const character = await api.characters.getCharacterById(id, this.limit);
      runInAction(() => {
        this.character = character;
        this.error = 'success';
      });
    } catch (error) {
      runInAction(() => {
        this.error = 'error';
      });
      console.error(error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  @action
  getCharactersWithOffset = async (offset: number): Promise<void> => {
    try {
      this.loading = true;
      const characters = await api.characters.getCharactersWithOffset(
        offset,
        this.limit
      );
      runInAction(() => {
        this.charactersCurentSlide = offset;
        this.characters = characters;
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
  getCharactersWithName = async (
    offset: number,
    title: string
  ): Promise<void> => {
    try {
      this.loading = true;
      const characters = await api.characters.getCharactersByName(
        offset,
        title,
        this.limit
      );
      runInAction(() => {
        this.charactersCurentSlide = offset;
        this.characters = characters.characters;
        this.charactersCount = characters.totalCount;
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

const charactersStore = new CharactersStore();

export default charactersStore;
