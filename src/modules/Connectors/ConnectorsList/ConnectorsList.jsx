import lodash from 'lodash';
/* eslint-disable no-unused-vars */
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DropdownItem from '../../../common/components/Dropdown/DropdownItem';
import List from '../../../common/components/List/List';
import ListItem from '../../../common/components/List/ListItem/ListItem';
import ListItemEdit from '../../../common/components/List/ListItemEdit/ListItemEdit';
import ListTableRow from '../../../common/components/List/ListTableView/ListTableRow/ListTableRow';
import ListNavBar from '../../../common/components/ListNavBar/ListNavBar';
import Preloader from '../../../common/components/Preloader/Preloader';
import Tooltip from '../../../common/components/Tooltip';
import {
  BREADCRUMBS_ROOT,
  EMPTY_STRING,
  TABLE_CELL_EMPTY_VALUE,
} from '../../../common/constants/common';
import {
  getConnector,
  getConnectorFolderChildren,
  getConnectorsFolderId,
  getObjectFromConnector,
} from '../../../data/actions/connectors';
import { createSampleUniverse } from '../../../data/actions/universes';
import { setConnectorId } from '../../../data/reducers/data';
import { closeEditConnectorModal } from '../../../data/reducers/ui';
import ConnectorIcon from '../../../layout/assets/connectorIcon.svg';
import FolderIcon from '../../../layout/assets/folderIcon.svg';
import SemanticLayerModal from '../../Symlayers/SemanticLayerModal';
import {
  FOLDER_DROPDOWN_ACTIONS,
  FOLDER_ITEM_DROPDOWN_ACTIONS,
  connectorsTableHeader,
  sortFoldersAndItems,
} from '../helper';
import styles from './ConnectorsList.module.scss';
import EditConnectorModal from './EditConnectorModal';
import { FILE_TYPE, FOLDER_TYPE } from './types';

const ConnectorsList = () => {
  const dispatch = useDispatch();
  const connectors = useSelector((state) => state.app.data.connectors);
  const connectorRootFolderId = useSelector(
    (state) => state.app.data.connectorsFolderId,
  );

  useEffect(() => {
    dispatch(getConnectorsFolderId({ folderType: 'USER_CN' }));
  }, []);

  const isEditConnModalVisible = useSelector(
    (state) => state.app.ui.editConnectorModalVisible,
  );

  const [foldersIdHistory, setFoldersIdHistory] = useState([]);
  const [foldersNameHistory, setFoldersNameHistory] = useState([]);
  const [sortedItems, setSortedItems] = useState([]);
  const [currentFolderIndex, setCurrentFolderIndex] = useState(0);
  const [actionButtonIsDisable, setActionButtonIsDisable] = useState({
    prev: true,
    next: false,
    up: true,
  });
  const [multiColumnView, setMultiColumnView] = useState(true);
  const [searchValue, setSearchValue] = useState();
  const [editListItemId, setEditListItemId] = useState();
  const [isCreateUnvModalVisible, setIsCreateUnvModalOpened] = useState(false);
  const [selectedConnectorId, setSelectedConnectorId] = useState(null);
  const [selectedConnectorName, setSelectedConnectorName] =
    useState(EMPTY_STRING);

  const goToRootFolder = () => {
    dispatch(getConnectorFolderChildren({ id: connectorRootFolderId }));
    setFoldersIdHistory([connectorRootFolderId]);
    setFoldersNameHistory([BREADCRUMBS_ROOT]);
    setCurrentFolderIndex(0);
  };

  useEffect(() => {
    if (selectedConnectorId) {
      const selCon = connectors.list.find(
        (con) => con.id === selectedConnectorId,
      );
      setSelectedConnectorName(selCon.name);
    }
  }, [selectedConnectorId]);

  const createUnvHandler = () => {
    dispatch(createSampleUniverse({}));
    dispatch(getObjectFromConnector({ id: selectedConnectorId }));
  };

  const closeCreateUnvModalHandler = () => {
    setIsCreateUnvModalOpened(false);
  };

  useEffect(() => {
    if (connectors) {
      setSortedItems(sortFoldersAndItems(connectors.list));
    }
  }, [connectors]);

  useEffect(() => {
    if (currentFolderIndex === 0 && connectorRootFolderId) {
      goToRootFolder();
    } else if (connectorRootFolderId) {
      dispatch(
        getConnectorFolderChildren({
          id: foldersIdHistory[currentFolderIndex],
        }),
      );
    }
  }, [currentFolderIndex]);

  useEffect(() => {
    if (connectorRootFolderId) {
      goToRootFolder();
    }
  }, [connectorRootFolderId]);

  useEffect(() => {
    setActionButtonIsDisable({
      prev: !currentFolderIndex,
      next:
        currentFolderIndex === foldersIdHistory.length - 1 ||
        currentFolderIndex === 0,
      up: !currentFolderIndex,
    });
  }, [currentFolderIndex, foldersIdHistory]);

  const onFolderDoubleClick = (folder) => {
    setFoldersIdHistory([...foldersIdHistory, folder.id]);
    setFoldersNameHistory([...foldersNameHistory, folder.name]);
    setCurrentFolderIndex((prev) => prev + 1);
  };

  const getBreadcrumbs = () => {
    return foldersNameHistory
      .map((i) => i)
      .slice(0, currentFolderIndex + 1)
      .join(` / `);
  };

  const moveToRootFolder = () => {
    setCurrentFolderIndex(0);
  };

  const moveToPrevFolder = () => {
    setCurrentFolderIndex((prev) => (prev === 0 ? 0 : prev - 1));
  };

  const moveToNextFolder = () => {
    setCurrentFolderIndex((prev) =>
      prev === foldersIdHistory.length ? prev : prev + 1,
    );
  };

  const onSearch = async () => {
    // something
  };

  const handleEditClick = (id) => {
    setEditListItemId(id);
  };

  const editConnectorModalHandler = (id) => {
    dispatch(getConnector({ id: id }));
  };

  const closeConnectorModalHandler = () => {
    dispatch(closeEditConnectorModal());
  };

  const handleItemClick = (id, action) => {
    switch (action) {
      case 'edit':
        handleEditClick(id);
        break;
      case 'delete':
        break;
      case 'create copy':
        break;
      case 'settings':
        editConnectorModalHandler(id);
        break;
      case 'connection check':
        break;
      case 'create universe':
        setIsCreateUnvModalOpened(true);
        setSelectedConnectorId(id);
        dispatch(setConnectorId(id));
        break;
      default:
        console.log(action);
    }
  };

  const getUniverseDropdownItems = (id) => (
    <div className={styles.itemsWrapper}>
      {FOLDER_ITEM_DROPDOWN_ACTIONS.map((item) => (
        <Tooltip
          key={item.title}
          overlay={<div className={styles.tooltip}>{item.title}</div>}
          trigger={['hover']}
        >
          <DropdownItem
            className={styles.dropdownItem}
            onClick={(action) => handleItemClick(id, action)}
            item={item}
          />
        </Tooltip>
      ))}
    </div>
  );

  const getFolderDropdownItems = (id) => (
    <div className={styles.itemsWrapper}>
      {FOLDER_DROPDOWN_ACTIONS.map((item) => (
        <Tooltip
          key={item.title}
          overlay={<div className={styles.tooltip}>{item.title}</div>}
          trigger={['hover']}
        >
          <DropdownItem
            className={styles.dropdownItem}
            item={item}
            onClick={(action) => handleItemClick(id, action)}
          />
        </Tooltip>
      ))}
    </div>
  );

  const listItemsWithDropdown = sortedItems
    ?.filter((item) => item.name !== FOLDER_TYPE.RECYCLE_BIN)
    .map((item) => {
      const isFolder = item.kind === 'FLD';

      const currentId = item.id;

      const menu = isFolder
        ? getFolderDropdownItems(`folder_${item.id}`)
        : getUniverseDropdownItems(item.id);

      return (
        <Fragment key={isFolder ? `folder_${item.id}` : item.id}>
          {editListItemId === currentId ? (
            <ListItemEdit
              value={item.name}
              // TODO: implement submit function
              // onSubmit={onItemEditSubmit}
              onBlur={() => setEditListItemId(null)}
            />
          ) : (
            <ListItem
              className={styles.folderItemsColumnView}
              name={item.name}
              onDoubleClick={isFolder ? () => onFolderDoubleClick(item) : null}
              icon={isFolder ? <FolderIcon /> : <ConnectorIcon />}
              menu={menu}
            />
          )}
        </Fragment>
      );
    });

  const tableHeader = connectorsTableHeader.map((i) => (
    <th key={i.name}>{i.name}</th>
  ));

  const tableRows = sortedItems
    ?.filter((item) => item.name !== FOLDER_TYPE.RECYCLE_BIN)
    .map((item) => {
      const isFolder = item.kind === 'FLD';

      const currentId = isFolder ? `folder_${item.id}` : item.id;

      const menu = isFolder
        ? getFolderDropdownItems(`folder_${item.id}`)
        : getUniverseDropdownItems(item.id);

      return (
        <ListTableRow
          key={currentId}
          onDoubleClick={isFolder ? () => onFolderDoubleClick(item) : null}
          isEditMode={editListItemId === currentId}
          onEditEnd={() => setEditListItemId(null)}
          icon={isFolder ? <FolderIcon /> : <ConnectorIcon />}
          name={item.name}
          menu={menu}
          connectType={FILE_TYPE[item.kind] || TABLE_CELL_EMPTY_VALUE}
          symlayerCount={item.desc || TABLE_CELL_EMPTY_VALUE}
        />
      );
    });

  return (
    <div className={styles.root}>
      <div className={styles.title}>Список соединений</div>
      <ListNavBar
        moveToRootFolder={moveToRootFolder}
        moveToPrevFolder={moveToPrevFolder}
        moveToNextFolder={moveToNextFolder}
        actionButtonIsDisable={actionButtonIsDisable}
        getBreadcrumbs={getBreadcrumbs}
        isMulticolumnsView={multiColumnView}
        multiColumnViewAction={setMultiColumnView}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onSearch={onSearch}
      />
      {!lodash.isEmpty(connectors) ? (
        <List
          listItems={listItemsWithDropdown}
          multiColumnView={multiColumnView}
          tableHeader={tableHeader}
          tableRows={tableRows}
        />
      ) : (
        <Preloader />
      )}
      <SemanticLayerModal
        isVisible={isCreateUnvModalVisible}
        onSave={createUnvHandler}
        onClose={closeCreateUnvModalHandler}
        connectorName={selectedConnectorName}
        connectorId={selectedConnectorId}
      />
      <EditConnectorModal
        visible={isEditConnModalVisible}
        onClose={closeConnectorModalHandler}
      />
    </div>
  );
};

export default ConnectorsList;
