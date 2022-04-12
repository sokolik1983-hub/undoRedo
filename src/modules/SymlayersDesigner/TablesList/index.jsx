/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styles from './TablesList.module.scss';
import TablesListItem from './TablesListItem';

function TablesList({ title, items, type }) {
  const [selected, setSelected] = useState(0);

  const handleClick = id => {
    setSelected(id);
  };
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.title}>{title}</div>

        <div className={styles.actions}>
          <div>+</div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.list}>
          {items?.map(item => (
            <TablesListItem
              key={item}
              name={
                type === 'links'
                  ? `${item.object1.object} - ${item.object2.object}`
                  : null
              }
              onClick={handleClick}
              isActive={selected === `${item.object1.object}_${item.object2.object}`}
              id={`${item.object1.object}_${item.object2.object}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TablesList;
