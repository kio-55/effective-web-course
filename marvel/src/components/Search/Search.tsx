import React, { ChangeEvent } from 'react';
import { Input } from 'antd';
import debounce from 'lodash.debounce';

import styles from './Search.module.css';
import { useTranslation } from 'react-i18next';

type SearchPropsType = {
  title: string;
  comicsCount: number;
  onSearch: (value: string) => void;
};

const Search: React.FC<SearchPropsType> = ({
  title,
  comicsCount,
  onSearch
}) => {
  const { t } = useTranslation();
  const onChange = React.useCallback(
    debounce((event: ChangeEvent<HTMLInputElement>) => {
      onSearch(event.target.value);
    }, 3000),
    []
  );

  return (
    <header className={styles.header}>
      <div className={styles.title}>
        <h1 className={styles.title__text}>{title}</h1>
        <span className={styles.title__counter}>({comicsCount})</span>
      </div>
      <Input
        placeholder={t('search') || 'Search'}
        allowClear
        size="large"
        onChange={onChange}
      />
    </header>
  );
};

export default Search;
