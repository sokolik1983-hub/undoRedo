import { useState } from 'react';
import PropTypes from 'prop-types';
import PanelListItem from '../PanelListItem/PanelListItem';
import { ReactComponent as FolderIcon } from '../../../../../layout/assets/folderIcon.svg';
import { ReactComponent as FolderOpenIcon } from '../../../../../layout/assets/folderOpenIcon.svg';
import { ReactComponent as GaugeIcon } from '../../../../../layout/assets/queryPanel/gaugeIcon.svg';
import { ReactComponent as MeasurementIcon } from '../../../../../layout/assets/queryPanel/measurementIcon.svg';
import { ReactComponent as AttributeIcon } from '../../../../../layout/assets/queryPanel/attributeIcon.svg';
import styles from './PanelListNode.module.scss';
import { useDragNDrop } from '../../../context/DragNDropContext';

const PanelListNode = ({ item }) => {
  const { handleDragStart } = useDragNDrop();
  const [isOpen, setIsOpen] = useState(false);

  const hasChildren = !!item?.children?.length;

  const getIcon = objectTypeId => {
    switch (objectTypeId) {
      case 1:
        return <GaugeIcon />;
      case 2:
        return <MeasurementIcon />;
      case 3:
        return <AttributeIcon />;
      default:
        return <FolderIcon />;
    }
  };

  if (item?.isFolder) {
    return (
      <li className={styles.listNode}>
        <PanelListItem
          onClick={() => setIsOpen(prev => !prev)}
          name={item?.name}
          icon={isOpen ? <FolderOpenIcon /> : <FolderIcon />}
          isFolder={item.isFolder}
          draggable
          onDragStart={e => handleDragStart(e, item)}
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
        name={item?.field}
        icon={getIcon(item.objectType_id)}
        isFolder={item.isFolder}
        draggable
        onDragStart={e => handleDragStart(e, item)}
      />
    </li>
  );
};

export default PanelListNode;

PanelListNode.propTypes = {
  item: PropTypes.object
};
