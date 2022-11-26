import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';

import comics from '../../mocks/comics.json';
import type { FullComicsPage } from '../../types/card';

import styles from './ComicsFullPage.module.css';

const ComicsFullPage: React.FC = () => {
  const [comic, setComic] = useState<FullComicsPage>();
  const { id } = useParams();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const result = comics.filter((element) => {
      return element.id === Number(id);
    });
    if (result.length) {
      setComic({
        id: result[0].id,
        imageUrl:
          result[0].thumbnail.path + '.' + result[0].thumbnail.extension,
        title: result[0].title,
        description: result[0].description,
        characters: result[0].characters.items,
        series: result[0].series
      });
    }
  }, []);

  if (!comic) {
    return (
      <>
        <h1 className={styles.title}>Cant find comics...</h1>
        <button className={styles.button} onClick={handleGoBack}>
          go back
        </button>
      </>
    );
  }

  return (
    <div className={styles.page}>
      <img className={styles.image} src={comic.imageUrl} alt="" />
      <div className={styles.content}>
        <div>
          <h1 className={styles.title}>{comic.title}</h1>
          <p>{comic.description}</p>
        </div>
        <div className={styles.list}>
          <h1 className={styles.title}>Characters</h1>
          {comic.characters.map((character) => {
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
        <div className={styles.list}>
          <h1 className={styles.title}>Series</h1>
          <Link
            key={comic.series.resourceURI}
            to={
              '/series/' +
              new URL(comic.series.resourceURI).pathname.replace(
                '/v1/public/series/',
                ''
              )
            }
          >
            {comic.series.name}
          </Link>
        </div>
      </div>
      <button className={styles.button} onClick={handleGoBack}>
        go back
      </button>
    </div>
  );
};

export default ComicsFullPage;
