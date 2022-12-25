import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Search from 'components/Search/Search';
import Error from 'components/Error/Error';

import charactersStore from 'stores/CharactersStore';

import CardList from '../../components/Card/CardList';
import { useTranslation } from 'react-i18next';
import { VirtuosoGrid } from 'react-virtuoso';
import CardItem from 'components/Card';

import styles from './Charactrers.module.css';

const Characters: React.FC = () => {
  const { characters, loading, charactersCount, error, limit } =
    charactersStore;

  const { t } = useTranslation();

  const [offset, setOffset] = useState(limit);

  const [searchedValue, setSearch] = useState('');

  const onSearch = (value: string) => {
    if (value) {
      charactersStore.getCharactersWithName(0, value);
      setSearch(value);
      setOffset(20);
      console.log(searchedValue);
    } else {
      charactersStore.getCharactersList();
      setSearch('');
      setOffset(20);
    }
  };

  const getNext = () => {
    if (charactersCount > characters.length) {
      if (searchedValue.length == 0) {
        charactersStore.getCharactersWithOffsetAndAdd(offset);
      } else {
        charactersStore.getCharactersWithNameAndAdd(offset, searchedValue);
      }
      setOffset((prev) => prev + limit);
    }
  };

  useEffect(() => {
    charactersStore.getCharactersList();
  }, []);

  if (error != 'success') {
    return <Error {...{ error }}></Error>;
  }

  const title: string = t('characters_title');

  return (
    <div>
      <Search
        {...{
          title: title,
          comicsCount: charactersCount,
          onSearch: onSearch
        }}
      ></Search>

      {!loading || characters.length ? (
        <VirtuosoGrid
          useWindowScroll
          style={{
            width: '100%'
          }}
          totalCount={charactersCount}
          listClassName={styles.list}
          data={characters}
          endReached={getNext}
          overscan={200}
          itemContent={(index, character) => {
            return (
              <CardItem
                key={index}
                {...{
                  id: character.id,
                  imageUrl: `${character.thumbnail.path}.${character.thumbnail.extension}`,
                  title: character.name,
                  description: character.description,
                  page: 'characters'
                }}
              ></CardItem>
            );
          }}
        ></VirtuosoGrid>
      ) : (
        <CardList {...{ cards: [], loading: true }}></CardList>
      )}
    </div>
  );
};

export default observer(Characters);
