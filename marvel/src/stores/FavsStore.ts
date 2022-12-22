import { observable, action, makeObservable, runInAction } from 'mobx';

class FavsStore {
  @observable
  series: string[] = [];

  @observable
  comics: string[] = [];

  @observable
  characters: string[] = [];

  constructor() {
    makeObservable(this);
  }

  @action
  getAllFavs = async (): Promise<void> => {
    runInAction(() => {
      this.series = JSON.parse(localStorage.getItem('favs-series') || '[]');
      this.comics = JSON.parse(localStorage.getItem('favs-comics') || '[]');
      this.characters = JSON.parse(
        localStorage.getItem('favs-characters') || '[]'
      );
    });
  };

  @action
  appendFavById = async (
    id: string,
    page: 'comics' | 'characters' | 'series'
  ): Promise<void> => {
    runInAction(() => {
      if (page === 'comics') {
        this.comics.push(id);
        localStorage.setItem(`favs-${page}`, JSON.stringify(this.comics));
        return;
      }
      if (page === 'series') {
        this.series.push(id);
        localStorage.setItem(`favs-${page}`, JSON.stringify(this.series));
        return;
      }
      if (page === 'characters') {
        this.characters.push(id);
        localStorage.setItem(`favs-${page}`, JSON.stringify(this.characters));
        return;
      }
    });
  };

  @action
  removeFavById = async (
    id: string,
    page: 'comics' | 'characters' | 'series'
  ): Promise<void> => {
    runInAction(() => {
      if (page === 'comics') {
        const myIndex = this.comics.indexOf(id.toString());
        this.comics.splice(myIndex, 1);
        localStorage.setItem(`favs-${page}`, JSON.stringify(this.comics));
        return;
      }
      if (page === 'series') {
        const myIndex = this.series.indexOf(id.toString());
        this.series.splice(myIndex, 1);
        localStorage.setItem(`favs-${page}`, JSON.stringify(this.series));
        return;
      }
      if (page === 'characters') {
        const myIndex = this.characters.indexOf(id.toString());
        this.characters.splice(myIndex, 1);
        localStorage.setItem(`favs-${page}`, JSON.stringify(this.characters));
        return;
      }
    });
  };

  isLiked = (id: string, page: 'comics' | 'characters' | 'series'): boolean => {
    if (page === 'comics') {
      return this.comics.indexOf(id.toString()) != -1;
    }
    if (page === 'series') {
      return this.series.indexOf(id.toString()) != -1;
    }
    if (page === 'characters') {
      return this.characters.indexOf(id.toString()) != -1;
    }
    return false;
  };
}

const favsStore = new FavsStore();

export default favsStore;
