import React from 'react';
import { NavLink } from 'react-router-dom';
import { Switch } from 'antd';

import logo from '../../assets/marvel_logo.svg';
import styles from './Header.module.css';
import { useTheme } from 'hooks/useTheme';

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
  return (
    <header className={styles.header}>
      <img src={logo} className={styles.logo} alt="Marvel logo"></img>
      <Switch
        checkedChildren="light"
        unCheckedChildren="dark"
        defaultChecked={theme == 'light' ? true : false}
        onChange={(checked: boolean) => {
          return checked ? setTheme('light') : setTheme('dark');
        }}
      />
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
