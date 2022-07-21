import clsx from 'clsx';
import React, { FC } from 'react';

import Tooltip from '../../Tooltip';
import { INavItemProps } from '../NavigationMenu';
import styles from './NavItem.module.scss';

const NavItem: FC<INavItemProps> = ({ id, onClick, active, icon, title }) => {
  const handleClick = () => onClick?.(id);

  const itemClass = clsx(styles.item, {
    [styles.active]: active,
  });

  return (
    <div className={itemClass} onClick={handleClick}>
      <Tooltip placement="top" overlay={<div>{title || ''}</div>}>
        {icon}
      </Tooltip>
    </div>
  );
};

export default NavItem;
