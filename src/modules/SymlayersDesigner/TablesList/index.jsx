/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setObjectsConnectionsModal } from '../../../data/actions/universes';
import styles from './TablesList.module.scss';
import TablesListItem from './TablesListItem';

function TablesList({ title, items, type, onSelect }) {
  const [selected, setSelected] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selected) onSelect(selected);
  }, [selected])

  const handleClick = id => {
    setSelected(id);
    // console.log(items);
    // console.log(selected);
    dispatch(setObjectsConnectionsModal(true));
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
