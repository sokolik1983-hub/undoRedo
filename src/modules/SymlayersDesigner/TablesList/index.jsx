/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setObjectsConnectionsModal } from '../../../data/actions/universes';
import styles from './TablesList.module.scss';
import TablesListItem from './TablesListItem';

function TablesList({ title, items, type }) {
  const dispatch = useDispatch();

  const links = useSelector(state => state.app.schemaDesigner.links);

  const handleClick = id => {
    const result = links.filter(l => {
      return (l.id === id);
    });
    dispatch(setObjectsConnectionsModal(true, ...result));
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.content}>
        <div className={styles.list}>
          {items?.map((item, i) => (
            <TablesListItem
              key={item}
              name={
                type === 'links'
                  ? `${item.object1.object} - ${item.object2.object}`
                  : null
              }
              onDoubleClick={handleClick}
              id={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TablesList;
