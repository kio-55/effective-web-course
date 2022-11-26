import React, { useEffect, useState } from 'react';
import { CardTypes } from '../../types/card';

import { Input } from 'antd';

const { Search } = Input;

const onSearch = (value: string) => console.log(value);

import styles from './Comics.module.css';
import comicsJSON from '../../assets/comics.json';
import CardList from '../../components/Card/CardList';

const Comics: React.FC = () => {
  const [comicsList, setComics] = useState<CardTypes[]>();

  useEffect(() => {
    const comics: CardTypes[] = [];
    comicsJSON.map((item) => {
      comics.push({
        id: item.id,
        imageUrl: item.thumbnail.path + '.' + item.thumbnail.extension,
        description: item.description,
        title: item.title
      });
    });
    setComics(comics);
  }, []);
  if (comicsList) {
    return (
      <div>
        <header className={styles.header}>
          <div className={styles.title}>
            <h1 className={styles.title__text}>Characters</h1>
            <span className={styles.title__counter}>({comicsList.length})</span>
          </div>
          <Search
            placeholder="Search hero ..."
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
        </header>
        <CardList {...comicsList}></CardList>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Comics;
