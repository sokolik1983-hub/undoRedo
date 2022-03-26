/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { useState } from 'react';
import { ReactComponent as FolderIcon } from '../../../../../layout/assets/folder-icon.svg';
import styles from './PanelListItem.module.scss';

const PanelListItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  const hasChildren = !!item?.children?.length;

  return (
    <>
      {item?.isFolder ? (
        <div className={styles.listItem}>
          <span className={styles.listItemIcon}>
            <FolderIcon />
          </span>
          <span className={styles.listItemText}>{item.folder_name}</span>
        </div>
      ) : (
        <div className={styles.listItem}>item</div>
      )}
    </>
  );
};

export default PanelListItem;

PanelListItem.propTypes = {
  item: PropTypes.object
};
