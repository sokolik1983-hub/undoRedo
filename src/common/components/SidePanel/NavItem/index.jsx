/* eslint-disable react/prop-types */
import React from 'react';
import clsx from 'clsx';
import Tooltip from '../../Tooltip/index'
import styles from './NavItem.module.scss';

function NavItem({ id, onClick, active, icon }) {
  function handleClick() {
    onClick(id);
  }

  const itemClass = clsx(styles.navigation__item, {
    [styles.navigation__item_active]: active
  });

  return (
    <div className={itemClass} onClick={handleClick}>
      <Tooltip placement="top">
        {icon}
      </Tooltip>
    </div>
  );
}

export default NavItem;
