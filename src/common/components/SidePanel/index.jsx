import React, { useState } from 'react';
import lodash from 'lodash';
import SettingsIcon from '@material-ui/icons/Settings';
import styles from './SidePanel.module.scss';
import NavigationMenu from './NavigationMenu';

const NAV_MENU = [
  { id: 1, title: 'Settings', icon: <SettingsIcon /> },
  { id: 2, title: 'Data', icon: <SettingsIcon /> },
  { id: 3, title: 'Export', icon: <SettingsIcon /> }
];

// eslint-disable-next-line react/prop-types
export default function SidePanel({ marginRight }) {
  const [activePage, setActivePage] = useState(1);

  function getMenuItem() {
    const selectedMenuItem = lodash.find(
      NAV_MENU,
      item => item.id === activePage
    );
    return selectedMenuItem || {};
  }

  return (
    <div
      className={styles.root}
      style={{
        right: marginRight
      }}
    >
      <NavigationMenu
        menu={NAV_MENU}
        onClick={setActivePage}
        activePage={activePage}
      />
      <div>{getMenuItem().title}</div>
      <div>content</div>
    </div>
  );
}
