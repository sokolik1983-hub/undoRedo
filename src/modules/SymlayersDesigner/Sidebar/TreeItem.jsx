import React, { useState } from "react";
import PropTypes from 'prop-types';
import { ReactComponent as TableIcon } from '../../../layout/assets/icons/tableIcon.svg';
import {ReactComponent as FolderIcon } from '../../../layout/assets/folderIcon.svg';
import styles from './Sidebar.module.scss';

const TreeItem = ({name, isTable, item, onSelect}) => {
  const [isActive, setActive] = useState(false);

  const handleSelect = (value) => {
    console.log(value)
    onSelect(value);
  }

  return (
    <>
      {isTable ? (
        <div className={isActive ? styles.actTableItem : styles.tableItem} onClick={() => setActive(!isActive)}>
          <div className={styles.icons}>
            {!isActive && <FolderIcon className={styles.folderIcon} />}
            <TableIcon />
          </div>
          <span>{name}</span>
        </div>
      )
        : (
          <div className={isActive ? styles.actItem : styles.item} onDoubleClick={(e) => {handleSelect(e); setActive(!isActive)}}>
            <span>{item.object_name}</span>
          </div>
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