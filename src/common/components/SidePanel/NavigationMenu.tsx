import React, { FC } from 'react';

import NavItem from './NavItem';
import styles from './SidePanel.module.scss';

interface INavigationMenuProps {
  onClick: (id: string | number) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  menu: Array<any>;
  activePage: boolean;
}

const NavigationMenu: FC<INavigationMenuProps> = ({
  onClick,
  menu = [],
  activePage,
}) => {
  return (
    <div className={styles.navigation}>
      {menu &&
        menu.map((item) => (
          <NavItem
            key={item.id}
            title={item.title}
            id={item.id}
            {...item}
            onClick={onClick}
            active={activePage === item.id}
          />
        ))}
    </div>
  );
};

export default NavigationMenu;
