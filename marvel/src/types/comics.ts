type TextObject = {
  type: string;
  language: string;
  text: string;
};

type URL = {
  type: string;
  url: string;
};

type Serial = {
  resourceURI: string;
  name: string;
};

type Variant = {
  resourceURI: string;
  name: string;
};

type Collection = {
  resourceURI: string;
  name: string;
};

type Date = {
  type: string;
  date: string;
};

type Prices = {
  type: string;
  price: number;
};

type Thumbnail = {
  path: string;
  extension: string;
};

type Image = {
  path: string;
  extension: string;
};

type Creators = {
  available: number;
  collectionURI: string;
  items: {
    resourceURI: string;
    name: string;
    role: string;
  }[];
  returned: number;
};

type Characters = {
  available: number;
  collectionURI: string;
  items: {
    resourceURI: string;
    name: string;
  }[];
  returned: number;
};

type Stories = {
  available: number;
  collectionURI: string;
  items: {
    resourceURI: string;
    name: string;
    type: string;
  }[];
  returned: number;
};

type Events = {
  available: number;
  collectionURI: string;
  items: {
    resourceURI: string;
    name: string;
  }[];
  returned: number;
};

type Comics = {
  available: number;
  collectionURI: string;
  items: {
    resourceURI: string;
    name: string;
  }[];
  returned: number;
};

type Serials = {
  available: number;
  collectionURI: string;
  items: Serial[];
  returned: number;
};

type SeriesSummary = {
  resourceURI: string;
  name: string;
};

export type ComicType = {
  id: number;
  digitalId: number;
  title: string;
  issueNumber: number;
  variantDescription: string;
  description: string;
  modified: string;
  isbn: string;
  upc: string;
  diamondCode: string;
  ean: string;
  issn: string;
  format: string;
  pageCount: number;
  textObjects: TextObject[];
  resourceURI: string;
  urls: URL[];
  series: Serial;
  variants: Variant[];
  collections: Collection[];
  collectedIssues: Collection[];
  dates: Date[];
  prices: Prices[];
  thumbnail: Thumbnail;
  images: Image[];
  creators: Creators;
  characters: Characters;
  stories: Stories;
  events: Events;
};

export type CharacterType = {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: Thumbnail;
  resourceURI: string;
  comics: Comics;
  series: Serials;
  stories: Stories;
  events: Events;
  urls: URL[];
};

export type SerialType = {
  id: number;
  title: string;
  description: string | null;
  resourceURI: string;
  urls: URL[];
  startYear: number;
  endYear: number;
  rating: string;
  type: string;
  modified: string;
  thumbnail: Thumbnail;
  comics: Comics;
  stories: Stories;
  events: Events;
  characters: Characters;
  creators: Creators;
  next: SeriesSummary | null;
  previous: SeriesSummary | null;
};
