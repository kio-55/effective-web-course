import React from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../../assets/marvel_logo.svg';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <img src={logo} className={styles.logo} alt="Marvel logo"></img>
      <nav className={styles.links}>
        <NavLink
          className={({ isActive }) =>
            isActive ? styles.link + ' ' + styles.active : styles.link
          }
          to="/characters"
        >
          Characters
        </NavLink>
        <NavLink
          to="/comics"
          className={({ isActive }) =>
            isActive ? styles.link + ' ' + styles.active : styles.link
          }
        >
          Comics
        </NavLink>
        <NavLink
          to="/series"
          className={({ isActive }) =>
            isActive ? styles.link + ' ' + styles.active : styles.link
          }
        >
          Series
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
