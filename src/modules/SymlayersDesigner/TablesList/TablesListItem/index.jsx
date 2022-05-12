/* eslint-disable react/prop-types */
import clsx from 'clsx';
import React, { useState } from 'react';
import styles from './TablesListItem.module.scss';


function TablesListItem({ id, name, onDoubleClick }) {
  const [isActive, setActive] = useState(false);

  const handleClick = () => {
    onDoubleClick(id);
    setActive(true);
    setTimeout(() => setActive(false), 1000);
  };

  return (
    <div
      className={clsx(styles.root, isActive && styles.active)}
      onDoubleClick={handleClick}
    >
      {name}
    </div>
  );
}

export default TablesListItem;
