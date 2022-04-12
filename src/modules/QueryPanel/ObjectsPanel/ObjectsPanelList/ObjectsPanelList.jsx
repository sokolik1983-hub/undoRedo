import PropTypes from 'prop-types';
import { useState } from 'react';
import PanelListItem from './PanelListItem/PanelListItem';
import { ReactComponent as FolderIcon } from '../../../../layout/assets/folderIcon.svg';
import { ReactComponent as GaugeIcon } from '../../../../layout/assets/queryPanel/gaugeIcon.svg';
import { ReactComponent as MeasurementIcon } from '../../../../layout/assets/queryPanel/measurementIcon.svg';
import { ReactComponent as AttributeIcon } from '../../../../layout/assets/queryPanel/attributeIcon.svg';
import styles from './ObjectsPanelList.module.scss';

const ObjectsPanelList = ({ rootFolder }) => {
  return (
    <ul className={styles.root}>
      {rootFolder?.map(item => (
        <PanelListNode key={item.id} item={item} />
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

  const getIcon = id => {
    switch (id) {
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
        name={item?.field}
        icon={getIcon(item.objectType_id)}
        isFolder={item.isFolder}
      />
    </li>
  );
};

PanelListNode.propTypes = {
  item: PropTypes.object
};
