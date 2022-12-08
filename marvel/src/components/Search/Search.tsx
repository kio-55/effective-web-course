import React from 'react';
import { Input } from 'antd';

import styles from './Search.module.css';

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
  return (
    <header className={styles.header}>
      <div className={styles.title}>
        <h1 className={styles.title__text}>{title}</h1>
        <span className={styles.title__counter}>({comicsCount})</span>
      </div>
      <Input.Search
        placeholder="Search comics ..."
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />
    </header>
  );
};

export default Search;
