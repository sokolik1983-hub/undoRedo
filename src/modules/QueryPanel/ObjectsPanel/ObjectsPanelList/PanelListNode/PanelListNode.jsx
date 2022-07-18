import PropTypes from 'prop-types';
import { useState } from 'react';

import { DRAG_PARENT_SECTION } from '../../../../../common/constants/common';
import FolderIcon from '../../../../../layout/assets/folderIcon.svg';
import FolderOpenIcon from '../../../../../layout/assets/folderOpenIcon.svg';
import { useDragNDrop } from '../../../context/DragNDropContext';
import { getIconByItemType } from '../../../queryPanelHelper';
import PanelListItem from '../PanelListItem/PanelListItem';
import styles from './PanelListNode.module.scss';

const PanelListNode = ({ item }) => {
  const { handleDragStart } = useDragNDrop();
  const [isOpen, setIsOpen] = useState(false);

  const hasChildren = !!item?.children?.length;
  const isFolder = item?.objectType === 'Folder';

  if (isFolder) {
    return (
      <li className={styles.listNode}>
        <PanelListItem
          onClick={() => setIsOpen((prev) => !prev)}
          name={item?.name}
          icon={isOpen ? <FolderOpenIcon /> : <FolderIcon />}
          isFolder={isFolder}
          draggable
          onDragStart={(e) =>
            handleDragStart(e, item, DRAG_PARENT_SECTION.TREE)
          }
        />
        {isOpen && hasChildren && (
          <ul className={styles.listNodeInnerList}>
            {item?.children.map((child) => (
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
        icon={getIconByItemType(item.objectType) || <FolderIcon />}
        isFolder={isFolder}
        draggable
        onDragStart={(e) => handleDragStart(e, item, DRAG_PARENT_SECTION.TREE)}
      />
    </li>
  );
};

export default PanelListNode;

PanelListNode.propTypes = {
  item: PropTypes.object,
};
