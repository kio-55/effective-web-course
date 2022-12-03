import axios from './helpers/axios';

import type { comicType } from '../types/comics';

export default {
  async getComicsList(): Promise<comicType[]> {
    const response = await axios.get('/comics');
    console.log(response.data);
    return response.data.json().data;
  }
};
