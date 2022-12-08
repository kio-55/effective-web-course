import React, { useEffect, useState } from 'react';
import { CardTypes } from '../../types/card';

import styles from './Series.module.css';
import seriesJSON from '../../mocks/series.json';
import CardList from '../../components/Card/CardList';

import { Input } from 'antd';

const { Search } = Input;

const onSearch = (value: string) => console.log(value);

const Series: React.FC = () => {
  const [seriesList, setSeries] = useState<CardTypes[]>();

  useEffect(() => {
    const series: CardTypes[] = [];
    seriesJSON.map((item) => {
      series.push({
        id: item.id,
        imageUrl: item.thumbnail.path + '.' + item.thumbnail.extension,
        description: item.description || '',
        title: item.title
      });
    });
    setSeries(series);
  }, []);
  if (seriesList) {
    return (
      <div>
        <header className={styles.header}>
          <div className={styles.title}>
            <h1 className={styles.title__text}>Characters</h1>
            <span className={styles.title__counter}>({seriesList.length})</span>
          </div>
          <Search
            placeholder="Search hero ..."
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
        </header>
        <CardList {...{ cards: seriesList, loading: false }}></CardList>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Series;
