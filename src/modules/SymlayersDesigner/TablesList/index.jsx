/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setObjectsConnectionsModal } from '../../../data/actions/universes';
import styles from './TablesList.module.scss';
import TablesListItem from './TablesListItem';

function TablesList({ title, items, type }) {
  const dispatch = useDispatch();

  const links = useSelector((state) => state.app.schemaDesigner.links);
  const selectedTablesData = useSelector(
    (state) => state.app.schemaDesigner.selectedTablesData,
  );

  const handleClick = (id) => {
    const result = links.filter((l) => {
      return l.id === id;
    });
    dispatch(setObjectsConnectionsModal(true, ...result));
  };

  const createObjectName = (id1, id2) => {
    const tableName1 = selectedTablesData?.find(
      (tableData) => tableData.id === id1,
    );
    const tableName2 = selectedTablesData?.find(
      (tableData) => tableData.id === id2,
    );
    const schema1 = tableName1?.schema;
    const objectName1 = tableName1?.objectName;
    const objectFullName1 = `${schema1}.${objectName1}`;
    const schema2 = tableName2?.schema;
    const objectName2 = tableName2?.objectName;
    const objectFullName2 = `${schema2}.${objectName2}`;
    return `${objectFullName1} - ${objectFullName2}`;
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.content}>
        <div className={styles.list}>
          {items?.map((item, i) => {
            return (
              <div className={styles.item}>
                <TablesListItem
                  key={item + item.id}
                  name={
                    type === 'links'
                      ? createObjectName(
                          item.object1.table_id,
                          item.object2.table_id,
                        )
                      : null
                  }
                  onDoubleClick={handleClick}
                  id={i + 1}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TablesList;
