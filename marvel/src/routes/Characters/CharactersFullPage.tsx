import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import charactersStore from 'stores/CharactersStore';
import styles from './CharacterFullPage.module.css';
import Error from 'components/Error/Error';
import { useTranslation } from 'react-i18next';

const CharactersFullPage: React.FC = () => {
  const { character, loading, error } = charactersStore;
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (id) {
      charactersStore.getCharacterById(id);
    }
  }, []);

  if (error != 'success') {
    return <Error {...{ error }}></Error>;
  }

  return loading || !character ? (
    <>
      {loading && !character ? (
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
        src={character.thumbnail.path + '.' + character.thumbnail.extension}
        alt=""
      />
      <div className={styles.content}>
        <div>
          <h1 className={styles.title}>{character.name}</h1>
          <p>{character.description}</p>
        </div>
        <div className={styles.list}>
          <h1 className={styles.title}>{t('comics_title')}</h1>
          {character.comics.items.map((comics) => {
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
          <h1 className={styles.title}>{t('series__title')}</h1>
          {character.series.items.map((series) => {
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
        {t('back')}
      </button>
    </div>
  );
};

export default observer(CharactersFullPage);
