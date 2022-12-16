import React from 'react';
import { NavLink } from 'react-router-dom';
import { Switch } from 'antd';

import logo from '../../assets/marvel_logo.svg';
import styles from './Header.module.css';
import { useTheme } from 'hooks/useTheme';
import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();

  //Translation
  const { t, i18n } = useTranslation();

  return (
    <header className={styles.header}>
      <img src={logo} className={styles.logo} alt="Marvel logo"></img>
      <Switch
        checkedChildren={t('light_theme')}
        unCheckedChildren={t('dark_theme')}
        defaultChecked={theme == 'light' ? true : false}
        onChange={(checked: boolean) => {
          return checked ? setTheme('light') : setTheme('dark');
        }}
      />
      <Switch
        checkedChildren="ru"
        unCheckedChildren="en"
        onChange={(checked: boolean) => {
          return checked
            ? i18n.changeLanguage('ru')
            : i18n.changeLanguage('en');
        }}
      />
      <nav className={styles.links}>
        <NavLink
          className={({ isActive }) =>
            isActive ? styles.link + ' ' + styles.active : styles.link
          }
          to="/characters"
        >
          {t('characters_title')}
        </NavLink>
        <NavLink
          to="/comics"
          className={({ isActive }) =>
            isActive ? styles.link + ' ' + styles.active : styles.link
          }
        >
          {t('comics_title')}
        </NavLink>
        <NavLink
          to="/series"
          className={({ isActive }) =>
            isActive ? styles.link + ' ' + styles.active : styles.link
          }
        >
          {t('series__title')}
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
