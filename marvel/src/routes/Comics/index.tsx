import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Search from 'components/Search/Search';
import Error from 'components/Error/Error';

import comicsStore from 'stores/ComicsStore';

import { VirtuosoGrid } from 'react-virtuoso';
import CardList from '../../components/Card/CardList';
import { useTranslation } from 'react-i18next';
import CardItem from 'components/Card';
import styles from './Comics.module.css';

const Comics: React.FC = () => {
  const { comics, loading, comicsCount, limit, error } = comicsStore;

  const { t } = useTranslation();

  const [searchedValue, setSearch] = useState('');
  const [offset, setOffset] = useState(limit);

  const onSearch = (value: string) => {
    if (value) {
      comicsStore.getComicsWithName(0, value);
      setSearch(value);
      setOffset(20);
      console.log(searchedValue);
    } else {
      comicsStore.getComicsList();
      setSearch('');
      setOffset(20);
    }
  };

  const getNext = () => {
    if (comicsCount > comics.length) {
      if (searchedValue.length == 0) {
        comicsStore.getComicsWithOffsetAndAdd(offset);
      } else {
        comicsStore.getComicsWithNameAndAdd(offset, searchedValue);
      }
      setOffset((prev) => prev + limit);
    }
  };

  useEffect(() => {
    comicsStore.getComicsList();
  }, []);

  if (error != 'success') {
    return <Error {...{ error }}></Error>;
  }

  const title: string = t('comics_title');

  return (
    <div>
      <Search
        {...{
          title: title,
          comicsCount: comicsCount,
          onSearch: onSearch
        }}
      ></Search>

      {!loading || comics.length ? (
        <VirtuosoGrid
          useWindowScroll
          style={{
            width: '100%'
          }}
          totalCount={comicsCount}
          listClassName={styles.list}
          data={comics}
          endReached={getNext}
          overscan={200}
          itemContent={(index, comic) => {
            return (
              <CardItem
                key={index}
                {...{
                  id: comic.id,
                  imageUrl: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
                  title: comic.title,
                  description: comic.description,
                  page: 'comics'
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

export default observer(Comics);
