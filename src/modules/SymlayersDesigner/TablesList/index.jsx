/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styles from './TablesList.module.scss';
import TablesListItem from './TablesListItem';

const MOCK = [
  { id: 1, name: 'test' },
  { id: 2, name: 'test' },
  { id: 3, name: 'test' },
  { id: 4, name: 'test' },
  { id: 5, name: 'test' },
  { id: 6, name: 'test' },
  { id: 7, name: 'test' },
  { id: 8, name: 'test' },
  { id: 9, name: 'test' },
  { id: 10, name: 'test' },
  { id: 11, name: 'test' },
  { id: 12, name: 'test' },
  { id: 13, name: 'test' },
  { id: 14, name: 'test' },
  { id: 15, name: 'test' }
];

function TablesList({ title }) {
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
          {MOCK.map(item => (
            <TablesListItem
              key={item.id}
              id={item.id}
              name={item.name}
              onClick={handleClick}
              isActive={selected === item.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TablesList;
