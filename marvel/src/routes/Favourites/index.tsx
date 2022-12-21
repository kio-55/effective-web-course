import CardList from 'components/Card/CardList';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import charactersStore from 'stores/CharactersStore';
import comicsStore from 'stores/ComicsStore';
import seriesStore from 'stores/SeriesStore';
import { CardTypes } from 'types/card';
import { characterType, comicType, serialType } from 'types/comics';
import styles from './Favourites.module.css';

const cutCharactersInfo = (charactersArr: characterType[]): CardTypes[] => {
  const characters: CardTypes[] = [];
  charactersArr.map((item) => {
    characters.push({
      id: item.id,
      imageUrl: item.thumbnail.path + '.' + item.thumbnail.extension,
      description: item.description,
      title: item.name,
      page: 'characters'
    });
  });
  return characters;
};

const cutComicsInfo = (comicsArr: comicType[]): CardTypes[] => {
  const comics: CardTypes[] = [];
  comicsArr.map((item) => {
    comics.push({
      id: item.id,
      imageUrl: item.thumbnail.path + '.' + item.thumbnail.extension,
      description: item.description,
      title: item.title,
      page: 'comics'
    });
  });
  return comics;
};

const cutSeriesInfo = (seriesArr: serialType[]): CardTypes[] => {
  const series: CardTypes[] = [];
  seriesArr.map((item) => {
    series.push({
      id: item.id,
      imageUrl: item.thumbnail.path + '.' + item.thumbnail.extension,
      description: item.description ? item.description : 'No description yet!',
      title: item.title,
      page: 'series'
    });
  });
  return series;
};

const Favourites: React.FC = () => {
  const { characters } = charactersStore;
  const { comics } = comicsStore;
  const { series } = seriesStore;
  const { t } = useTranslation();

  useEffect(() => {
    const favCharacters = JSON.parse(
      localStorage.getItem('favs-characters') || '[]'
    );
    const favComics = JSON.parse(localStorage.getItem('favs-comics') || '[]');
    const favSeries = JSON.parse(localStorage.getItem('favs-series') || '[]');
    if (favCharacters.length) {
      charactersStore.getCharactersListByIds(favCharacters);
    }
    if (favComics.length) {
      comicsStore.getComicsListByIds(favComics);
    }
    if (favSeries.length) {
      seriesStore.getSeriesListByIds(favSeries);
    }
  }, []);

  return (
    <div className={styles.favs}>
      <h1 className={styles.title}>{t('favourites')}</h1>
      <h1 className={styles.title}>{t('characters_title')}</h1>
      <CardList
        {...{ cards: cutCharactersInfo(characters), loading: false }}
      ></CardList>
      <h1 className={styles.title}>{t('comics_title')}</h1>
      <CardList
        {...{ cards: cutComicsInfo(comics), loading: false }}
      ></CardList>
      <h1 className={styles.title}>{t('series__title')}</h1>
      <CardList
        {...{ cards: cutSeriesInfo(series), loading: false }}
      ></CardList>
    </div>
  );
};

export default observer(Favourites);
