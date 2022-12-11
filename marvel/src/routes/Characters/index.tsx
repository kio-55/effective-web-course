import React, { useEffect, useState } from 'react';
import type { CardTypes } from '../../types/card';
import { observer } from 'mobx-react-lite';
import { Pagination } from 'antd';
import Search from 'components/Search/Search';
import Error from 'components/Error/Error';

import charactersStore from 'stores/CharactersStore';

import CardList from '../../components/Card/CardList';
import { characterType } from 'types/comics';

const cutCharactersInfo = (charactersArr: characterType[]): CardTypes[] => {
  const characters: CardTypes[] = [];
  charactersArr.map((item) => {
    characters.push({
      id: item.id,
      imageUrl: item.thumbnail.path + '.' + item.thumbnail.extension,
      description: item.description,
      title: item.name
    });
  });
  return characters;
};

const Characters: React.FC = () => {
  const {
    characters,
    loading,
    charactersCount,
    charactersCurentSlide,
    limit,
    error
  } = charactersStore;

  const [searchedValue, setSearch] = useState('');

  const onSearch = (value: string) => {
    if (value) {
      charactersStore.getCharactersWithName(0, value);
      setSearch(value);
    } else {
      charactersStore.getCharactersList();
    }
  };

  useEffect(() => {
    charactersStore.getCharactersList();
  }, []);

  if (error != 'success') {
    return <Error {...{ error }}></Error>;
  }

  return (
    <div>
      <Search
        {...{
          title: 'Characters',
          comicsCount: charactersCount,
          onSearch: onSearch
        }}
      ></Search>

      {!loading && characters.length ? (
        <CardList
          {...{ cards: cutCharactersInfo(characters), loading: loading }}
        ></CardList>
      ) : (
        <CardList
          {...{ cards: cutCharactersInfo(characters), loading: true }}
        ></CardList>
      )}
      <Pagination
        simple
        pageSize={limit}
        total={charactersCount}
        current={(charactersCurentSlide + limit) / limit}
        onChange={(page) => {
          const offset = (page - 1) * limit;
          return searchedValue
            ? charactersStore.getCharactersWithName(offset, searchedValue)
            : charactersStore.getCharactersWithOffset(offset);
        }}
      />
    </div>
  );
};

export default observer(Characters);
