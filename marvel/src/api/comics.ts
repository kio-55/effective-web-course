import axios from './helpers/axios';

import type { comicType } from '../types/comics';

type ReturnedType = {
  comics: comicType[];
  totalCount: number;
};

export default {
  async getComicsList(limit: number): Promise<ReturnedType> {
    const params = {
      limit
    };
    const response = await axios.get('/comics', { params });
    return {
      comics: response.data.data.results,
      totalCount: response.data.data.total
    };
  },
  async getComicsById(id: string, limit: number): Promise<comicType> {
    const params = {
      limit
    };
    const response = await axios.get('/comics/' + id, { params });
    return response.data.data.results[0];
  },
  async getComicsWithOffset(
    offset: number,
    limit: number
  ): Promise<comicType[]> {
    const params = {
      limit,
      offset
    };
    const response = await axios.get('/comics', { params });
    return response.data.data.results;
  },
  async getComicsByName(
    offset: number,
    title: string,
    limit: number
  ): Promise<ReturnedType> {
    const params = {
      offset,
      titleStartsWith: title,
      limit
    };
    const response = await axios.get('/comics', { params });
    return {
      comics: response.data.data.results,
      totalCount: response.data.data.total
    };
  }
};
