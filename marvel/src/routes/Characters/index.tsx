import React, { useEffect, useState } from 'react';
import charractersJSON from '../../mocks/characters.json';
import type { CardTypes } from '../../types/card';
import { Input } from 'antd';

const { Search } = Input;

import CardList from '../../components/Card/CardList';

import styles from './Charactrers.module.css';

const onSearch = (value: string) => console.log(value);

const Characters: React.FC = () => {
  const [charactersList, setCharacters] = useState<CardTypes[]>();

  useEffect(() => {
    const characters: CardTypes[] = [];
    charractersJSON.map((item) => {
      characters.push({
        id: item.id,
        imageUrl: item.thumbnail.path + '.' + item.thumbnail.extension,
        description: item.description,
        title: item.name
      });
    });
    setCharacters(characters);
  }, []);
  if (charactersList) {
    return (
      <div>
        <header className={styles.header}>
          <div className={styles.title}>
            <h1 className={styles.title__text}>Characters</h1>
            <span className={styles.title__counter}>
              ({charactersList.length})
            </span>
          </div>
          <Search
            placeholder="Search hero ..."
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
        </header>
        <CardList {...{ cards: charactersList, loading: false }}></CardList>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Characters;
