/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
/* eslint-disable react/jsx-wrap-multilines */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import Tooltip from '../../../common/components/Tooltip';
import { getTableIdFromParams } from '../../../data/helpers';
import {
  addHighlight,
  deleteHighlight,
} from '../../../data/reducers/schemaDesigner';
import FolderIcon from '../../../layout/assets/folderIcon.svg';
import TableIcon from '../../../layout/assets/icons/viewsShow.svg';
import OpenFolderIcon from '../../../layout/assets/openFolderIcon.svg';
import styles from './Sidebar.module.scss';
import TreeTableField from './TreeTableField';

const TreeItem = ({ name, isSchema, table, onSelect, isOpen, searchMod }) => {
  const [isActive, setActive] = useState(false);
  const [isFolderOpen, setFolderOpen] = useState(false);
  const [event, setEvent] = useState({});
  const dispatch = useDispatch();

  const selectedTables = useSelector(
    (state) => state.app.schemaDesigner.selectedTables,
  );

  const highlightedTables = useSelector(
    (state) => state.app.schemaDesigner.highlightedTables,
  );

  useEffect(() => {
    if (isOpen) setFolderOpen(true);
    else setFolderOpen(false);
  }, [isOpen]);

  const selectedTableColumns =
    selectedTables[getTableIdFromParams({ ...table })];

  useEffect(() => {
    // if (!isSchema && isActive) { // не уверен что нужно но надо проверить
    //   onSelect(table, event);
    // }
    if (isSchema && isActive) {
      setTimeout(() => setActive(false), 240);
    } else {
      if (!isActive) {
        const idx = highlightedTables.findIndex(
          (tab) => tab === `${table.schema}_${table.objectName}`,
        );
        if (idx !== -1) {
          dispatch(deleteHighlight(idx));
        }
      } else {
        dispatch(addHighlight(`${table.schema}_${table.objectName}`));
      }
    }
  }, [isActive]);

  return (
    <>
      {isSchema ? (
        <Tooltip placement="bottomLeft" overlay={<>{name}</>}>
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
        <Tooltip placement="bottomLeft" overlay={<>{table.objectName}</>}>
          <div
            className={isActive ? styles.actItem : styles.item}
            onDoubleClick={(e) => {
              if (!searchMod) {
                e.preventDefault();
                setActive(!isActive);
                setEvent(e);
                onSelect(table);
              }
            }}
            onClick={() => {
              if (searchMod) {
                setActive(!isActive);
              }
            }}
          >
            <button
              type="button"
              draggable={!searchMod}
              onDragStart={(e) => {
                if (!searchMod)
                  e.dataTransfer.setData('item', JSON.stringify(table));
              }}
              onDragEnd={() => {
                if (!isActive && !searchMod) setActive(true);
              }}
              // onDoubleClick={() => !searchMod && onSelect(table)}
            >
              <div className={styles.icons}>
                {!isActive && <FolderIcon className={styles.folderIcon} />}
                <TableIcon className={isActive && styles.iconActive} />
              </div>
              <span>{table.objectName}</span>
            </button>
            {isActive && (
              <div className={styles.tableFields}>
                {selectedTableColumns?.columns
                  ? selectedTableColumns?.columns.map((col) => (
                      <TreeTableField field={col} key={Math.random()} />
                    ))
                  : selectedTableColumns?.map((col) => (
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
  isOpen: PropTypes.bool,
};

export default TreeItem;
