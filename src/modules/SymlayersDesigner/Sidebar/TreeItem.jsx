import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { ReactComponent as TableIcon } from '../../../layout/assets/icons/tableIcon.svg';
import { ReactComponent as FolderIcon } from '../../../layout/assets/folderIcon.svg';
import styles from './Sidebar.module.scss';

const TreeItem = ({name, isTable, item, onSelect}) => {
  const [isActive, setActive] = useState(false);
  const [isFolderOpen, setFolderOpen] = useState(false);  const [event, setEvent] = useState({});

  useEffect(() => {
    if (!isTable && isActive) onSelect(item, event);
    if (isTable && isActive) {
      setTimeout(() => setActive(false), 240);
    }
  }, [isActive])

  return (
    <>
      {isTable ? (
        <div
          className={isActive ? styles.actTableItem : styles.tableItem}
          onClick={() => {
          setActive(!isActive);
          setFolderOpen(!isFolderOpen);
        }}
        >
          <div className={styles.icons}>
            {!isFolderOpen && <FolderIcon className={styles.folderIcon} />}
            <TableIcon />
          </div>
          <span>{name}</span>
        </div>
      )
        : (
          <button
            className={isActive ? styles.actItem : styles.item}
            type='button'
            onDoubleClick={(e) => {
            e.preventDefault();
            setActive(!isActive);
            setEvent(e);
          }}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData("item", JSON.stringify(item));
            }}
            onDragEnd={() => {
              if (!isActive) setActive(true)
            }}
          >
            <span>{item.object_name}</span>
          </button>
        )}
    </>
  )
};

TreeItem.propTypes = {
  name: PropTypes.string,
  isTable: PropTypes.bool,
  item: PropTypes.object,
  onSelect: PropTypes.func
}

export default TreeItem;