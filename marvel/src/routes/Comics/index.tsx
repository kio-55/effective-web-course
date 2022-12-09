import React, { useEffect, useState } from 'react';
import { CardTypes } from '../../types/card';
import { observer } from 'mobx-react-lite';
import { Pagination } from 'antd';
import Search from 'components/Search/Search';
import Error from 'components/Error/Error';

import comicsStore from 'stores/ComicsStore';

import CardList from '../../components/Card/CardList';
import { comicType } from 'types/comics';

const cutComicsInfo = (comicsArr: comicType[]): CardTypes[] => {
  const comics: CardTypes[] = [];
  comicsArr.map((item) => {
    comics.push({
      id: item.id,
      imageUrl: item.thumbnail.path + '.' + item.thumbnail.extension,
      description: item.description,
      title: item.title
    });
  });
  return comics;
};

const Comics: React.FC = () => {
  const { comics, loading, comicsCount, comicsCurentSlide, limit, error } =
    comicsStore;

  const [searchedValue, setSearch] = useState('');

  const onSearch = (value: string) => {
    if (value) {
      comicsStore.getComicsWithName(0, value);
      setSearch(value);
    } else {
      comicsStore.getComicsList();
    }
  };

  useEffect(() => {
    comicsStore.getComicsList();
  }, []);

  if (error != 'success') {
    return <Error {...{ error }}></Error>;
  }

  return (
    <div>
      <Search
        {...{
          title: 'Comics',
          comicsCount: comicsCount,
          onSearch: onSearch
        }}
      ></Search>

      {!loading && comics.length ? (
        <CardList
          {...{ cards: cutComicsInfo(comics), loading: loading }}
        ></CardList>
      ) : (
        <CardList
          {...{ cards: cutComicsInfo(comics), loading: true }}
        ></CardList>
      )}
      <Pagination
        simple
        pageSize={limit}
        total={comicsCount}
        current={(comicsCurentSlide + limit) / limit}
        onChange={(page) => {
          const offset = (page - 1) * limit;
          return searchedValue
            ? comicsStore.getComicsWithName(offset, searchedValue)
            : comicsStore.getComicsWithOffset(offset);
        }}
      />
    </div>
  );
};

export default observer(Comics);
