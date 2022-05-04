/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch } from 'react-redux';
import { setObjectsConnectionsModal } from '../../../data/actions/universes';
import styles from './TablesList.module.scss';
import TablesListItem from './TablesListItem';

function TablesList({ title, items, type, onSelect }) {
  const dispatch = useDispatch();

  const handleClick = id => {
    onSelect(id);
    dispatch(setObjectsConnectionsModal(true, id));
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.title}>{title}</div>
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
              onDoubleClick={handleClick}
              id={`${item.object1.object}&${item.object2.object}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TablesList;
