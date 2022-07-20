import clsx from 'clsx';
import React, { FC, ReactElement } from 'react';

import Tooltip from '../../Tooltip';
import styles from './NavItem.module.scss';

interface INavItemProps {
  id: string | number;
  onClick: (id: string | number) => void;
  active: boolean;
  icon: ReactElement;
  title: string;
}

const NavItem: FC<INavItemProps> = ({ id, onClick, active, icon, title }) => {
  const handleClick = () => onClick(id);

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
