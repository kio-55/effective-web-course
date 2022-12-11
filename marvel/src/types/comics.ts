type textObject = {
  type: string;
  language: string;
  text: string;
};

type url = {
  type: string;
  url: string;
};

type serial = {
  resourceURI: string;
  name: string;
};

type variant = {
  resourceURI: string;
  name: string;
};

type collection = {
  resourceURI: string;
  name: string;
};

type date = {
  type: string;
  date: string;
};

type prices = {
  type: string;
  price: number;
};

type thumbnail = {
  path: string;
  extension: string;
};

type image = {
  path: string;
  extension: string;
};

type creators = {
  available: number;
  collectionURI: string;
  items: {
    resourceURI: string;
    name: string;
    role: string;
  }[];
  returned: number;
};

type characters = {
  available: number;
  collectionURI: string;
  items: {
    resourceURI: string;
    name: string;
  }[];
  returned: number;
};

type stories = {
  available: number;
  collectionURI: string;
  items: {
    resourceURI: string;
    name: string;
    type: string;
  }[];
  returned: number;
};

type events = {
  available: number;
  collectionURI: string;
  items: {
    resourceURI: string;
    name: string;
  }[];
  returned: number;
};

type comics = {
  available: number;
  collectionURI: string;
  items: {
    resourceURI: string;
    name: string;
  }[];
  returned: number;
};

type serials = {
  available: number;
  collectionURI: string;
  items: serial[];
  returned: number;
};

type SeriesSummary = {
  resourceURI: string;
  name: string;
}

export type comicType = {
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
  textObjects: textObject[];
  resourceURI: string;
  urls: url[];
  series: serial;
  variants: variant[];
  collections: collection[];
  collectedIssues: collection[];
  dates: date[];
  prices: prices[];
  thumbnail: thumbnail;
  images: image[];
  creators: creators;
  characters: characters;
  stories: stories;
  events: events;
};

export type characterType = {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: thumbnail;
  resourceURI: string;
  comics: comics;
  series: serials;
  stories: stories;
  events: events;
  urls: url[];
};

export type serialType = {
  id: number;
  title: string;
  description: string | null;
  resourceURI: string;
  urls: url[];
  startYear: number;
  endYear: number;
  rating: string;
  type: string;
  modified: string;
  thumbnail: thumbnail;
  comics: comics;
  stories: stories;
  events: events;
  characters: characters;
  creators: creators;
  next: SeriesSummary | null;
  previous: SeriesSummary | null;
};
