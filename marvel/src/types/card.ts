export type CardTypes = {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  page: 'comics' | 'characters' | 'series';
};

type Comics = {
  resourceURI: string;
  name: string;
};

type Series = {
  resourceURI: string;
  name: string;
};

type Character = {
  resourceURI: string;
  name: string;
};

export type FullCharacterCard = {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  comics: Comics[];
  series: Series[];
};

export type FullComicsPage = {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  characters: Character[];
  series: Series;
};

export type FullSeriesPage = {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  characters: Character[];
  comics: Comics[];
};
