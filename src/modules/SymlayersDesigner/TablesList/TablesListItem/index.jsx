/* eslint-disable react/prop-types */
import clsx from 'clsx';
import React from 'react';
import styles from './TablesListItem.module.scss';


function TablesListItem({ isActive, id, name, onClick }) {
  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <div
      className={clsx(styles.root, isActive && styles.active)}
      onClick={handleClick}
    >
      {name}
    </div>
  );
}

export default TablesListItem;
