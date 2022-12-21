import axios from './helpers/axios';

import type { CharacterType } from '../types/comics';

type ReturnedType = {
  characters: CharacterType[];
  totalCount: number;
};

export default {
  async getCharactersList(limit: number): Promise<ReturnedType> {
    const params = {
      limit
    };
    const response = await axios.get('/characters', { params });
    return {
      characters: response.data.data.results,
      totalCount: response.data.data.total
    };
  },
  async getCharacterById(id: string, limit: number): Promise<CharacterType> {
    const params = {
      limit
    };
    const response = await axios.get('/characters/' + id, { params });
    return response.data.data.results[0];
  },
  async getCharactersWithOffset(
    offset: number,
    limit: number
  ): Promise<CharacterType[]> {
    const params = {
      limit,
      offset
    };
    const response = await axios.get('/characters', { params });
    return response.data.data.results;
  },
  async getCharactersByName(
    offset: number,
    title: string,
    limit: number
  ): Promise<ReturnedType> {
    const params = {
      offset,
      nameStartsWith: title,
      limit
    };
    const response = await axios.get('/characters', { params });
    return {
      characters: response.data.data.results,
      totalCount: response.data.data.total
    };
  }
};
