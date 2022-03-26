/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { useState } from 'react';
// import PanelListItem from './PanelListItem/PanelListItem';
import { ReactComponent as FolderIcon } from '../../../../layout/assets/folder-icon.svg';
import styles from './ObjectsPanelList.module.scss';

const ObjectsPanelList = ({ rootFolder }) => {
  return (
    // <div className={styles.root}>
    <ul className={styles.root}>
      {rootFolder?.children?.map(item => (
        <PanelListNode
          key={item.isFolder ? `folder_${item.folder_id}` : item.id}
          item={item}
        />
      ))}
    </ul>
    // </div>
  );
};

export default ObjectsPanelList;

ObjectsPanelList.propTypes = {
  rootFolder: PropTypes.object
};

const PanelListNode = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  const hasChildren = !!item?.children?.length;

  return (
    <li>
      {item?.isFolder ? (
        <div
          className={styles.listItem}
          onClick={() => setIsOpen(prev => !prev)}
        >
          <span className={styles.listItemIcon}>
            <FolderIcon />
          </span>
          <span className={styles.listItemText}>{item.folder_name}</span>
        </div>
      ) : (
        <div className={styles.listItem}>item</div>
      )}
    </li>
  );
};

PanelListNode.propTypes = {
  item: PropTypes.object
};
