import React from 'react';

import logo from '../../assets/marvel_logo.svg';
import styles from './Footer.module.css';
import currYear from '../../config/environments';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <img className={styles.logo} src={logo} alt="Marvel logo" />
      <h2 className={styles.title}>
        Data provided by Marvel. © {currYear.currYear} MARVEL
      </h2>
      <a
        className={styles.link}
        href="http://developer.marvel.com"
        target="_blank"
      >
        developer.marvel.com
      </a>
    </footer>
  );
};

export default Footer;
