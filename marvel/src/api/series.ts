import axios from './helpers/axios';

import type { serialType } from '../types/comics';

type ReturnedType = {
  serials: serialType[];
  totalCount: number;
};

export default {
  async getSeriesList(limit: number): Promise<ReturnedType> {
    const params = {
      limit
    };
    const response = await axios.get('/series', { params });
    return {
      serials: response.data.data.results,
      totalCount: response.data.data.total
    };
  },
  async getSeriesById(id: string, limit: number): Promise<serialType> {
    const params = {
      limit
    };
    const response = await axios.get('/series/' + id, { params });
    return response.data.data.results[0];
  },
  async getSeriesWithOffset(
    offset: number,
    limit: number
  ): Promise<serialType[]> {
    const params = {
      limit,
      offset
    };
    const response = await axios.get('/series', { params });
    return response.data.data.results;
  },
  async getSeriesByName(
    offset: number,
    title: string,
    limit: number
  ): Promise<ReturnedType> {
    const params = {
      offset,
      titleStartsWith: title,
      limit
    };
    const response = await axios.get('/series', { params });
    return {
      serials: response.data.data.results,
      totalCount: response.data.data.total
    };
  }
};
