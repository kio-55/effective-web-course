import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';

import characters from '../../mocks/characters.json';
import type { FullCharacterCard } from '../../types/card';

import styles from './CharacterFullPage.module.css';

const CharactersFullPage: React.FC = () => {
  const [character, setCharacter] = useState<FullCharacterCard>();
  const { id } = useParams();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const result = characters.filter((element) => {
      return element.id === Number(id);
    });
    if (result.length) {
      setCharacter({
        id: result[0].id,
        imageUrl:
          result[0].thumbnail.path + '.' + result[0].thumbnail.extension,
        title: result[0].name,
        description: result[0].description,
        comics: result[0].comics.items,
        series: result[0].series.items
      });
    }
  }, []);

  if (!character) {
    return (
      <>
        <h1 className={styles.title}>Cant find hero...</h1>
        <button className={styles.button} onClick={handleGoBack}>
          go back
        </button>
      </>
    );
  }

  return (
    <div className={styles.page}>
      <img className={styles.image} src={character.imageUrl} alt="" />
      <div className={styles.content}>
        <div>
          <h1 className={styles.title}>{character.title}</h1>
          <p>{character.description}</p>
        </div>
        <div className={styles.list}>
          <h1 className={styles.title}>Comics</h1>
          {character.comics.map((comics) => {
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
          <h1 className={styles.title}>Series</h1>
          {character.series.map((series) => {
            return (
              <Link
                key={series.resourceURI}
                to={
                  '/series/' +
                  new URL(series.resourceURI).pathname.replace(
                    '/v1/public/series/',
                    ''
                  )
                }
              >
                {series.name}
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

export default CharactersFullPage;
