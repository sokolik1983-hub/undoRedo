import { useState } from 'react';
import PropTypes from 'prop-types';
import PanelListItem from '../PanelListItem/PanelListItem';
import { ReactComponent as FolderIcon } from '../../../../../layout/assets/folderIcon.svg';
import { ReactComponent as FolderOpenIcon } from '../../../../../layout/assets/folderOpenIcon.svg';

import { getIconByItemType } from '../../../queryPanelHelper';
import { DRAG_PARENT_SECTION } from '../../../../../common/constants/common';
import styles from './PanelListNode.module.scss';

const PanelListNode = ({ item }) => {
  const handleDragStart = (e, obj) => {
    e.stopPropagation();
    e.dataTransfer.setData('text', JSON.stringify(obj));
    e.dataTransfer.setDragImage(e.target, -10,10)
  };

  const [isOpen, setIsOpen] = useState(false);

  const hasChildren = !!item?.children?.length;

  if (item?.isFolder) {
    return (
      <li className={styles.listNode}>
        <PanelListItem
          onClick={() => setIsOpen(prev => !prev)}
          name={item?.name}
          icon={isOpen ? <FolderOpenIcon /> : <FolderIcon />}
          isFolder={item.isFolder}
          draggable
          onDragStart={e => handleDragStart(e, item, DRAG_PARENT_SECTION.TREE)}
        />
        {isOpen && hasChildren && (
          <ul className={styles.listNodeInnerList}>
            {item?.children.map(child => (
              <PanelListNode key={child.id} item={child} />
            ))}
          </ul>
        )}
      </li>
    );
  }

  return (
    <li className={styles.listNode}>
      <PanelListItem
        name={item?.name}
        icon={getIconByItemType(item.type) || <FolderIcon />}
        isFolder={item.isFolder}
        draggable
        onDragStart={e => handleDragStart(e, item, DRAG_PARENT_SECTION.TREE)}
      />
    </li>
  );
};

export default PanelListNode;

PanelListNode.propTypes = {
  item: PropTypes.object
};
