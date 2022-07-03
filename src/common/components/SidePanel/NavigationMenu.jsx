/* eslint-disable react/prop-types */
import React from 'react';
import NavItem from './NavItem';
import styles from './SidePanel.module.scss';

export default function NavigationMenu({ onClick, menu = [], activePage }) {
  function handleClick(id) {
    onClick(id);
  }

  return (
    <div className={styles.navigation}>
      {menu &&
        menu.map(item => (
          <NavItem
            key={item.id}
            title={item.title}
            {...item}
            onClick={handleClick}
            active={activePage === item.id}
          />
        ))}
    </div>
  );
}
