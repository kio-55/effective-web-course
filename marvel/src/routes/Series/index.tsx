import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Search from 'components/Search/Search';
import seriesStore from 'stores/SeriesStore';
import CardList from '../../components/Card/CardList';
import Error from 'components/Error/Error';
import { useTranslation } from 'react-i18next';
import CardItem from 'components/Card';
import styles from './Series.module.css';
import { VirtuosoGrid } from 'react-virtuoso';

const Series: React.FC = () => {
  const { series, loading, seriesCount, limit, error } = seriesStore;
  const { t } = useTranslation();

  const [searchedValue, setSearch] = useState('');
  const [offset, setOffset] = useState(limit);

  useEffect(() => {
    seriesStore.getSeriesList();
  }, []);

  const onSearch = (value: string) => {
    if (value) {
      seriesStore.getSeriesWithName(0, value);
      setSearch(value);
      setOffset(20);
      console.log(searchedValue);
    } else {
      seriesStore.getSeriesList();
      setSearch('');
      setOffset(20);
    }
  };

  const getNext = () => {
    if (seriesCount > series.length) {
      if (searchedValue.length == 0) {
        seriesStore.getSeriesWithOffsetAndAdd(offset);
      } else {
        seriesStore.getSeriesWithNameAndAdd(offset, searchedValue);
      }
      setOffset((prev) => prev + limit);
    }
  };

  if (error != 'success') {
    return <Error {...{ error }}></Error>;
  }

  const title: string = t('series__title');

  return (
    <div>
      <Search
        {...{
          title: title,
          comicsCount: seriesCount,
          onSearch: onSearch
        }}
      ></Search>

      {!loading || series.length ? (
        <VirtuosoGrid
          useWindowScroll
          style={{
            width: '100%'
          }}
          totalCount={seriesCount}
          listClassName={styles.list}
          data={series}
          endReached={getNext}
          overscan={200}
          itemContent={(index, serial) => {
            return (
              <CardItem
                key={index}
                {...{
                  id: serial.id,
                  imageUrl: `${serial.thumbnail.path}.${serial.thumbnail.extension}`,
                  title: serial.title,
                  description: serial.description ? serial.description : '',
                  page: 'series'
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

export default observer(Series);
