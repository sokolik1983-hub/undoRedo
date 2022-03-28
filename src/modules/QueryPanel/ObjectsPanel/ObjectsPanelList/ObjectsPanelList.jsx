import PropTypes from 'prop-types';
import { useState } from 'react';
import PanelListItem from './PanelListItem/PanelListItem';
import { ReactComponent as FolderIcon } from '../../../../layout/assets/folder-icon.svg';
import { ReactComponent as OrangeIcon } from '../../../../layout/assets/queryPanel/orangeIcon.svg';
import styles from './ObjectsPanelList.module.scss';

const ObjectsPanelList = ({ rootFolder }) => {
  return (
    <ul className={styles.root}>
      {rootFolder?.children?.map(item => (
        <PanelListNode
          key={item.isFolder ? `folder_${item.folder_id}` : item.id}
          item={item}
        />
      ))}
    </ul>
  );
};

export default ObjectsPanelList;

ObjectsPanelList.propTypes = {
  rootFolder: PropTypes.object
};

const PanelListNode = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  const hasChildren = !!item?.children?.length;

  if (item?.isFolder) {
    return (
      <li className={styles.listNode}>
        <PanelListItem
          onClick={() => setIsOpen(prev => !prev)}
          name={item?.folder_name}
          icon={<FolderIcon />}
          isFolder={item.isFolder}
        />
        {isOpen && hasChildren && (
          <ul className={styles.listNodeInnerList}>
            <ObjectsPanelList rootFolder={item} />
          </ul>
        )}
      </li>
    );
  }

  return (
    <li className={styles.listNode}>
      <PanelListItem
        name={item?.name}
        icon={<OrangeIcon />}
        isFolder={item.isFolder}
      />
    </li>
  );
};

PanelListNode.propTypes = {
  item: PropTypes.object
};
