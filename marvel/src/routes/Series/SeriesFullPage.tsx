import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate, useParams } from 'react-router-dom';
import seriesStore from 'stores/SeriesStore';
import Error from 'components/Error/Error';

import styles from './SeriesFullPage.module.css';
import { useTranslation } from 'react-i18next';

const SeriesFullPage: React.FC = () => {
  const { serial, loading, error } = seriesStore;
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (id) {
      seriesStore.getSeriesById(id);
    }
  }, []);

  if (error != 'success') {
    return <Error {...{ error }}></Error>;
  }

  return loading || !serial ? (
    <>
      {loading && !serial ? (
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
    <div className={styles.page}>
      <img
        className={styles.image}
        src={serial.thumbnail.path + '.' + serial.thumbnail.extension}
        alt=""
      />
      <div className={styles.content}>
        <div>
          <h1 className={styles.title}>{serial.title}</h1>
          <p>{serial.description}</p>
        </div>
        <div className={styles.list}>
          <h1 className={styles.title}>{t('comics_title')}</h1>
          {serial.comics.items.map((comics) => {
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
          <h1 className={styles.title}>{t('characters_title')}</h1>
          {serial.characters.items.map((character) => {
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
        {t('back')}
      </button>
    </div>
  );
};

export default observer(SeriesFullPage);
