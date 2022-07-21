import React, { FC, ReactElement } from 'react';

import NavItem from './NavItem';
import styles from './SidePanel.module.scss';
interface INavigationMenuProps {
  onClick?: (id: number) => void;
  menu: Array<INavItemProps>;
  activePage: number;
}

export interface INavItemProps {
  id: number;
  onClick?: (id: number) => void;
  active?: boolean;
  icon: ReactElement;
  title: string;
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
            icon={item.icon}
            onClick={onClick}
            active={activePage === item.id}
          />
        ))}
    </div>
  );
};

export default NavigationMenu;
