/* eslint-disable react/jsx-wrap-multilines */
import clsx from 'clsx';
import { useState } from 'react';
import Dropdown from '../../../../common/components/Dropdown';
import FolderChildItem from '../../../../common/components/FolderChildItem/FolderChildItem';
import FolderItem from '../../../../common/components/FolderItem/FolderItem';
import IconButton from '../../../../common/components/IconButton';
import { useConnectorsListData } from '../../context/connectorsList';
import { FOLDER_ITEM_DROPDOWN_ACTIONS } from '../../helper';
import styles from './ConnectorsListView.module.scss';

// const FOLDER_ITEM_DROPDOWN_ACTION = [
//   <IconButton title="edit" render={() => <EditIcon />} onClick={() => {}} />,
//   <IconButton
//     title="move to bin"
//     render={() => <BinIcon />}
//     onClick={() => {}}
//   />,
//   <IconButton
//     title="settings"
//     render={() => <SettingsIcon />}
//     onClick={() => {}}
//   />
// ];

const ConnectorsListView = () => {
  const {
    connectors,
    multiColumnView,
    onFolderDoubleClick
  } = useConnectorsListData();

  const [activeId, setActiveId] = useState();

  const classes = clsx(styles.connectorsList, {
    [styles.multiColumnView]: multiColumnView
  });

  const makingItems = () =>
    FOLDER_ITEM_DROPDOWN_ACTIONS.map(({ title, icon }) => (
      <IconButton title={title} render={() => icon} onClick={() => {}} />
    ));

  return (
    <div className={classes}>
      {connectors?.map(item =>
        item.isFolder ? (
          <FolderItem
            key={`folder_${item.folder_id}`}
            name={item.folder_name}
            onDoubleClick={() => onFolderDoubleClick(item)}
          />
        ) : (
          <Dropdown
            mainButton={
              <FolderChildItem
                key={item.id}
                name={item.connect_name}
                onClick={() => setActiveId(item.id)}
                active={item.id === activeId}
              />
            }
            itemsWrapper={styles.itemsWrapper}
          >
            {makingItems()}
          </Dropdown>
        )
      )}
    </div>
  );
};

export default ConnectorsListView;
