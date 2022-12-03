import React, { useEffect, useState } from 'react';
import { CardTypes } from '../../types/card';
import comicsGet from '../../api/comics';

import { Input } from 'antd';

const { Search } = Input;

import styles from './Comics.module.css';
import comicsJSON from '../../mocks/comics.json';
import CardList from '../../components/Card/CardList';

const onSearch = (value: string) => console.log(value);

const Comics: React.FC = () => {
  const [comicsList, setComics] = useState<CardTypes[]>();

  useEffect(() => {
    comicsGet.getComicsList();
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
