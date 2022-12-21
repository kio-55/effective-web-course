import React from 'react';

import logo from '../../assets/marvel_logo.svg';
import styles from './Footer.module.css';
import currYear from '../../config/environments';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  //Translation
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <img className={styles.logo} src={logo} alt="Marvel logo" />
      <h2 className={styles.title}>
        {t('data_provided')}
        {currYear.currYear} MARVEL
      </h2>
      <a
        className={styles.link}
        href="http://developer.marvel.com"
        target="_blank"
        rel="noreferrer"
      >
        developer.marvel.com
      </a>
    </footer>
  );
};

export default Footer;
