export type CardTypes = {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  page: 'comics' | 'characters' | 'series';
};

type comics = {
  resourceURI: string;
  name: string;
};

type series = {
  resourceURI: string;
  name: string;
};

type character = {
  resourceURI: string;
  name: string;
};

export type FullCharacterCard = {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  comics: comics[];
  series: series[];
};

export type FullComicsPage = {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  characters: character[];
  series: series;
};

export type FullSeriesPage = {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  characters: character[];
  comics: comics[];
};
