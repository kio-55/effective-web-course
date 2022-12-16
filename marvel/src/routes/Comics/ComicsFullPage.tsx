import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import comicsStore from 'stores/ComicsStore';
import Error from 'components/Error/Error';

import styles from './ComicsFullPage.module.css';
import { useTranslation } from 'react-i18next';

const ComicsFullPage: React.FC = () => {
  const { comic, loading, error } = comicsStore;
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (id) {
      comicsStore.getComicsById(id);
    }
  }, []);

  if (error != 'success') {
    return <Error {...{ error }}></Error>;
  }

  return loading || !comic ? (
    <>
      {loading && !comic ? (
        <h1>{t('loading')}</h1>
      ) : (
        <>
          <h1>{t('error')}</h1>
          <button className={styles.button} onClick={handleGoBack}>
            {t('back')}
          </button>
        </>
      )}
    </>
  ) : (
    <>
      <div className={styles.page}>
        <img
          className={styles.image}
          src={comic.thumbnail.path + '.' + comic.thumbnail.extension}
          alt=""
        />
        <div className={styles.content}>
          <div>
            <h1 className={styles.title}>{comic.title}</h1>
            <p>{comic.description}</p>
          </div>
          <div className={styles.list}>
            <h1 className={styles.title}>{t('characters_title')}</h1>
            {comic.characters.items.map((character) => {
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
            <h1 className={styles.title}>{t('series__title')}</h1>
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
          {t('back')}
        </button>
      </div>
    </>
  );
};

export default observer(ComicsFullPage);
