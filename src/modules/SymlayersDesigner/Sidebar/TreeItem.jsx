import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import Tooltip from "../../../common/components/NewTooltip/Tooltip";
import { ReactComponent as TableIcon } from '../../../layout/assets/icons/viewsShow.svg';
import { ReactComponent as FolderIcon } from '../../../layout/assets/folderIcon.svg';
import { ReactComponent as OpenFolderIcon } from '../../../layout/assets/openFolderIcon.svg';
import styles from './Sidebar.module.scss';
import { getTableIdFromParams } from "../../../data/helpers";
import TreeTableField from "./TreeTableField";

const TreeItem = ({name, isSchema, table, onSelect}) => {
  const [isActive, setActive] = useState(false);
  const [isFolderOpen, setFolderOpen] = useState(false);  
  const [event, setEvent] = useState({});

  const selectedTables = useSelector(
    state => state.app.schemaDesigner.selectedTables
  );

  const selectedTableColumns = selectedTables[getTableIdFromParams({ ...table, connect_id: 4 })]

  useEffect(() => {
    if (!isSchema && isActive) {
      onSelect(table, event);
    };
    if (isSchema && isActive) {
      setTimeout(() => setActive(false), 240);
    }
  }, [isActive])

  return (
    <>
      {isSchema ? (
        <Tooltip text={name} className={name.length < 36 && styles.tooltip} placement='bottom-left'>
          <div
            className={isActive ? styles.actTableItem : styles.tableItem}
            onClick={() => {
              setActive(!isActive);
              setFolderOpen(!isFolderOpen);
            }}
          >
            <div>
              {isFolderOpen ? <OpenFolderIcon /> : <FolderIcon className={styles.folderIcon} />}
            </div>
            <span>{name}</span>
          </div>
        </Tooltip>
      )
        : (
          <div className={isActive ? styles.actItem : styles.item}>
            <Tooltip text={table.object_name} className={table.object_name.length < 26 && styles.tooltip} placement='bottom-left'>
              <button
                type='button'
                onDoubleClick={(e) => {
                  e.preventDefault();
                  setActive(!isActive);
                  setEvent(e);
                }}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("item", JSON.stringify(table));
                }}
                onDragEnd={() => {
                  if (!isActive) setActive(true)
                }}
              >
                <div className={styles.icons}>
                  {!isActive && <FolderIcon className={styles.folderIcon} />}
                  <TableIcon className={isActive && styles.iconActive} />
                </div>
                <span>{table.object_name}</span>
              </button>
            </Tooltip>
            {isActive && (
            <div className={styles.tableFields}>
              {selectedTableColumns?.map(col => (
                <TreeTableField field={col} key={col.field} />
                  ))}
            </div>
              )}
          </div>
        )}
    </>
  )
};

TreeItem.propTypes = {
  name: PropTypes.string,
  isSchema: PropTypes.bool,
  table: PropTypes.object,
  onSelect: PropTypes.func
}

export default TreeItem;