import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';

import series from '../../mocks/series.json';
import type { FullSeriesPage } from '../../types/card';

import styles from './SeriesFullPage.module.css';

const SeriesFullPage: React.FC = () => {
  const [serial, setSerial] = useState<FullSeriesPage>();
  const { id } = useParams();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const result = series.filter((element) => {
      return element.id === Number(id);
    });
    if (result.length) {
      setSerial({
        id: result[0].id,
        imageUrl:
          result[0].thumbnail.path + '.' + result[0].thumbnail.extension,
        title: result[0].title,
        description: result[0].description || '',
        comics: result[0].comics.items,
        characters: result[0].characters.items
      });
    }
  }, []);

  if (!serial) {
    return (
      <>
        <h1 className={styles.title}>Cant find serial...</h1>
        <button className={styles.button} onClick={handleGoBack}>
          go back
        </button>
      </>
    );
  }

  return (
    <div className={styles.page}>
      <img className={styles.image} src={serial.imageUrl} alt="" />
      <div className={styles.content}>
        <div>
          <h1 className={styles.title}>{serial.title}</h1>
          <p>{serial.description}</p>
        </div>
        <div className={styles.list}>
          <h1 className={styles.title}>Comics</h1>
          {serial.comics.map((comics) => {
            return (
              <Link
                key={comics.resourceURI}
                to={
                  '/comics/' +
                  new URL(comics.resourceURI).pathname.replace(
                    '/v1/public/comics/',
                    ''
                  )
                }
              >
                {comics.name}
              </Link>
            );
          })}
        </div>
        <div className={styles.list}>
          <h1 className={styles.title}>Characters</h1>
          {serial.characters.map((character) => {
            return (
              <Link
                key={character.resourceURI}
                to={
                  '/characters/' +
                  new URL(character.resourceURI).pathname.replace(
                    '/v1/public/characters/',
                    ''
                  )
                }
              >
                {character.name}
              </Link>
            );
          })}
        </div>
      </div>
      <button className={styles.button} onClick={handleGoBack}>
        go back
      </button>
    </div>
  );
};

export default SeriesFullPage;
