import React, { useEffect, useState } from 'react';
import { CardTypes } from '../../types/card';
import { observer } from 'mobx-react-lite';
import { Pagination } from 'antd';
import Search from 'components/Search/Search';
import seriesStore from 'stores/SeriesStore';
import CardList from '../../components/Card/CardList';
import { serialType } from 'types/comics';
import Error from 'components/Error/Error';
import { useTranslation } from 'react-i18next';

const cutSeriesInfo = (seriesArr: serialType[]): CardTypes[] => {
  const series: CardTypes[] = [];
  seriesArr.map((item) => {
    series.push({
      id: item.id,
      imageUrl: item.thumbnail.path + '.' + item.thumbnail.extension,
      description: item.description ? item.description : 'No description yet!',
      title: item.title
    });
  });
  return series;
};

const Series: React.FC = () => {
  const { series, loading, seriesCount, seriesCurrentSlide, limit, error } =
    seriesStore;
  const { t } = useTranslation();

  const [searchedValue, setSearch] = useState('');

  useEffect(() => {
    seriesStore.getSeriesList();
  }, []);

  const onSearch = (value: string) => {
    if (value) {
      seriesStore.getSeriesWithName(0, value);
      setSearch(value);
    } else {
      seriesStore.getSeriesList();
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

      {!loading && series.length ? (
        <CardList
          {...{ cards: cutSeriesInfo(series), loading: loading }}
        ></CardList>
      ) : (
        <CardList
          {...{ cards: cutSeriesInfo(series), loading: true }}
        ></CardList>
      )}
      <Pagination
        simple
        pageSize={limit}
        total={seriesCount}
        current={(seriesCurrentSlide + limit) / limit}
        onChange={(page) => {
          const offset = (page - 1) * limit;
          return searchedValue
            ? seriesStore.getSeriesWithName(offset, searchedValue)
            : seriesStore.getSeriesWithOffset(offset);
        }}
      />
    </div>
  );
};

export default observer(Series);
