/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-wrap-multilines */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { ReactComponent as TableIcon } from '../../../layout/assets/icons/viewsShow.svg';
import { ReactComponent as FolderIcon } from '../../../layout/assets/folderIcon.svg';
import { ReactComponent as OpenFolderIcon } from '../../../layout/assets/openFolderIcon.svg';
import styles from './Sidebar.module.scss';
import { getTableIdFromParams } from '../../../data/helpers';
import TreeTableField from './TreeTableField';
import Tooltip from '../../../common/components/Tooltip';

const TreeItem = ({ name, isSchema, table, onSelect, isOpen }) => {
  const [isActive, setActive] = useState(false);
  const [isFolderOpen, setFolderOpen] = useState(false);
  const [event, setEvent] = useState({});

  const selectedTables = useSelector(
    state => state.app.schemaDesigner.selectedTables
  );
  
  useEffect(() => {
    if (isOpen) setFolderOpen(true);
    else setFolderOpen(false);
  }, [isOpen])
  
//  const selectedTable = table && selectedTablesArray.find(selTable => selTable.name === `${table.schema}_${table.objectName}`);
  const selectedTableColumns =
    selectedTables[getTableIdFromParams({...table})];

  useEffect(() => {
    // if (!isSchema && isActive) { // не уверен что нужно но надо проверить
    //   onSelect(table, event);
    // }
    if (isSchema && isActive) {
      setTimeout(() => setActive(false), 240);
    }
  }, [isActive]);

  return (
    <>
      {isSchema ? (
        <Tooltip
          placement="bottomLeft"
          overlay={
            <>{name}</>
          }
        >
          <div
            className={isActive ? styles.actTableItem : styles.tableItem}
            onClick={() => {
              setActive(!isActive);
              setFolderOpen(!isFolderOpen);
            }}
          >
            <div>
              {isFolderOpen ? (
                <OpenFolderIcon />
              ) : (
                <FolderIcon className={styles.folderIcon} />
              )}
            </div>
            <span>{name}</span>
          </div>
        </Tooltip>
      ) : (
        <Tooltip
          placement="bottomLeft"
          overlay={
            <>
              {table.objectName}
            </>
          }
        >
          <div className={isActive ? styles.actItem : styles.item}>
            <button
              type="button"
              onDoubleClick={e => {
                e.preventDefault();
                setActive(!isActive);
                setEvent(e);
              }}
              draggable
              onDragStart={e => {
                e.dataTransfer.setData('item', JSON.stringify(table));
              }}
              onDragEnd={() => {
                if (!isActive) setActive(true);
              }}
            >
              <div className={styles.icons}>
                {!isActive && <FolderIcon className={styles.folderIcon} />}
                <TableIcon className={isActive && styles.iconActive} />
              </div>
              <span>{table.objectName}</span>
            </button>
            {isActive && (
              <div className={styles.tableFields}>
                {selectedTableColumns?.columns ? 
                selectedTableColumns?.columns.map(col => (
                  <TreeTableField field={col} key={Math.random()} />
                ))
                : 
                selectedTableColumns?.map(col => (
                  <TreeTableField field={col} key={Math.random()} />
                ))}
              </div>
            )}
          </div>
        </Tooltip>
      )}
    </>
  );
};

TreeItem.propTypes = {
  name: PropTypes.string,
  isSchema: PropTypes.bool,
  table: PropTypes.object,
  onSelect: PropTypes.func,
  isOpen: PropTypes.bool
};

export default TreeItem;
