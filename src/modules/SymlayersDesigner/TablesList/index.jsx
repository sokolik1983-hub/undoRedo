/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setObjectsConnectionsModal } from '../../../data/actions/universes';
import styles from './TablesList.module.scss';
import TablesListItem from './TablesListItem';

function TablesList({ title, items, type }) {
  const dispatch = useDispatch();
  const [key, setKey] = useState(0);

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
          {items?.map((item, i) => {
            setKey(i);
            return (
              <div className={styles.item}>
                <TablesListItem
                  key={item+key}
                  name={
                type === 'links'
                  ? `${item.object1.object_name} - ${item.object2.object_name}`
                  : null
              }
                  onDoubleClick={handleClick}
                  id={i}
                />
              </div>
          )})}
        </div>
      </div>
    </div>
  );
}

export default TablesList;
