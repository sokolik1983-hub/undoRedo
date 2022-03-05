import React from 'react';
import styles from './TopBar.module.scss';
import Logo from './Logo';
import UserMenu from './UserMenu';

const TopBar = () => {
  const actions = null; // TODO добавить экшены в зависимости от выбранного модуля

  return (
    <header className={styles.header}>
      <Logo />
      <div className={styles.actions}>{actions}</div>
      <div className={styles.userMenuWrapper}>
        <UserMenu />
      </div>
    </header>
  );
}

export default TopBar;
