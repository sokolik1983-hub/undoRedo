/* eslint-disable no-unused-vars */
import { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import lodash from 'lodash';
import ListNavBar from '../../../common/components/ListNavBar/ListNavBar';
import List from '../../../common/components/List/List';
import ListItem from '../../../common/components/List/ListItem/ListItem';
import ListItemEdit from '../../../common/components/List/ListItemEdit/ListItemEdit';
import DropdownItem from '../../../common/components/Dropdown/DropdownItem';
import ListTableRow from '../../../common/components/List/ListTableView/ListTableRow/ListTableRow';
import {
  connectorsTableHeader,
  FOLDER_DROPDOWN_ACTIONS,
  FOLDER_ITEM_DROPDOWN_ACTIONS,
  sortFoldersAndItems
} from '../helper';
import { ReactComponent as FolderIcon } from '../../../layout/assets/folderIcon.svg';
import { ReactComponent as ConnectorIcon } from '../../../layout/assets/connectorIcon.svg';
import {
  BREADCRUMBS_ROOT,
  TABLE_CELL_EMPTY_VALUE
} from '../../../common/constants/common';
import styles from './ConnectorsList.module.scss';
import Preloader from '../../../common/components/Preloader/Preloader';
import Tooltip from '../../../common/components/Tooltip';
import { getConnectorFolderChildren, getConnectorsFolderId, getConnector } from '../../../data/actions/connectors';
import { FOLDER_TYPE } from './types';
import EditConnectorModal from './EditConnectorModal';
import { closeEditConnectorModal, showEditConnectorModal } from '../../../data/reducers/ui';
import { setConnectorData } from '../../../data/reducers/data';

const ConnectorsList = () => {
  const dispatch = useDispatch();
  const connectors = useSelector(state => state.app.data.connectors);
  const connectorRootFolderId = useSelector(state => state.app.data.connectorsFolderId);

  useEffect(() => {
    dispatch(getConnectorsFolderId({folderType: 'USER_CN'}));
  }, []);

  const isEditConnModalVisible = useSelector(state => state.app.ui.editConnectorModalVisible);
  const mockObj = {
      "header" : {
        "id" : 123,
        "guid" : "8e95fa98-26eb-4f54-a0d0-298ed9d9badd",
        "kind" : "CON",
        "parent_id" : 42,
        "name" : "Придуманное пользователем имя",
        "description" : "комментарий пишет пользователь !",
        "owner_id" : 0,
        "createUser_id" : 0,
        "create_ts" : "2022-05-24T17:04:55.1234Z+3",
        "version" : "версия сервиса",
        "releaseNumber" : 1
      },
      "data" : {
        "class_id" : "db",
        "type_id" : "db-pg",
        "fields" : [
          {
            "fieldName" : "Имя или IP сервера",
            "fieldKey":"SERVER",
            "required" : true,
            "type" : "string",
            "value" : "local.mashine"
            },
          {
            "fieldName" : "Название Базы, SID, Имя сервиса",
            "fieldKey":"DATABASE",
            "required" : true,
            "type" : "string",
            "value" : "data-provider"
          },
          {
            "fieldName" : "Порт",
            "fieldKey":"PORT",
            "required" : true,
            "type" : "number",
            "value" : 43433
          },
          {
            "fieldName" : "Логин",
            "fieldKey":"UID",
            "required" : true,
            "type" : "string",
            "value" : "postgress"
          },
          {
            "fieldName" : "Пароль",
            "fieldKey":"PWD",
            "required" : true,
            "type" : "string",
            "value" : "xtqdUnzQykq6eSjMnaZsGnmaBTzvVRY7XqF6vQdx9SBbtn9UNHrzdWRX6dHPFPLP"
          },
          {
            "fieldName" : "Дополнительные параметры",
            "fieldKey":"external",
            "required" : false,
            "type" : "string",
            "value" : "BoolsAsChar=0;"
          }
        ]
    }
  }

  const [foldersIdHistory, setFoldersIdHistory] = useState([]);
  const [foldersNameHistory, setFoldersNameHistory] = useState([]);
  const [sortedItems, setSortedItems] = useState([]);
  const [currentFolderIndex, setCurrentFolderIndex] = useState(0);
  const [actionButtonIsDisable, setActionButtonIsDisable] = useState({
    prev: true,
    next: false,
    up: true
  });
  const [multiColumnView, setMultiColumnView] = useState(true);
  const [searchValue, setSearchValue] = useState();
  const [editListItemId, setEditListItemId] = useState();

  const goToRootFolder = () => {
    dispatch(getConnectorFolderChildren({id: connectorRootFolderId}));
    setFoldersIdHistory([connectorRootFolderId]);
    setFoldersNameHistory([BREADCRUMBS_ROOT]);
    setCurrentFolderIndex(0);
  }

  useEffect(() => {
    if (connectors) {
      setSortedItems(sortFoldersAndItems(connectors.list));
    }
  }, [connectors]);

  useEffect(() => {
    if (currentFolderIndex === 0 && connectorRootFolderId) {
      goToRootFolder();
    } else if (connectorRootFolderId) {
      dispatch(getConnectorFolderChildren({id: foldersIdHistory[currentFolderIndex]}));
    }
  }, [currentFolderIndex])

  useEffect(() => {
      if (connectorRootFolderId) {
        goToRootFolder();
      }
  }, [connectorRootFolderId])

  useEffect(() => {
    setActionButtonIsDisable({
      prev: !currentFolderIndex,
      next: currentFolderIndex === foldersIdHistory.length - 1 || currentFolderIndex === 0,
      up: !currentFolderIndex
    });
  }, [currentFolderIndex, foldersIdHistory]);

  const onFolderDoubleClick = folder => {
    setFoldersIdHistory([...foldersIdHistory, folder.id]);
    setFoldersNameHistory([...foldersNameHistory, folder.name]);
    setCurrentFolderIndex(prev => prev + 1);
  };

  const getBreadcrumbs = () => {
    return foldersNameHistory
      // .map(i => i)
      .map((i, idx) => (idx ? i.folder_name : ''))
      .slice(0, currentFolderIndex + 1)
      .join(` / `);
  }

  const moveToRootFolder = () => {
    setCurrentFolderIndex(0);
  };

  const moveToPrevFolder = () => {
    setCurrentFolderIndex(prev => (prev === 0 ? 0 : prev - 1));
  };

  const moveToNextFolder = () => {
    setCurrentFolderIndex(prev =>
      prev === foldersIdHistory.length ? prev : prev + 1
    );
  };

  const onSearch = async () => {};

  const handleEditClick = id => {
    setEditListItemId(id);
  };

  const editConnectorModalHandler = id => {
    // dispatch(getConnector({id}));
    return Promise.resolve(mockObj)
      .then(obj => {
        dispatch(setConnectorData(obj));
        dispatch(showEditConnectorModal());
      });
  };

  const closeConnectorModalHandler = () => {
    dispatch(closeEditConnectorModal())
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
        break;
      default:
        console.log(action);
    }
  };

  const getUniverseDropdownItems = id => (
    <div className={styles.itemsWrapper}>
      {FOLDER_ITEM_DROPDOWN_ACTIONS.map(item => (
        <Tooltip
          key={item.title}
          overlay={<div className={styles.tooltip}>{item.title}</div>}
          trigger={['hover']}
        >
          <DropdownItem
            className={styles.dropdownItem}
            onClick={action => handleItemClick(id, action)}
            item={item}
          />
        </Tooltip>
      ))}
    </div>
  );

  const getFolderDropdownItems = id => (
    <div className={styles.itemsWrapper}>
      {FOLDER_DROPDOWN_ACTIONS.map(item => (
        <Tooltip
          key={item.title}
          overlay={<div className={styles.tooltip}>{item.title}</div>}
          trigger={['hover']}
        >
          <DropdownItem
            className={styles.dropdownItem}
            item={item}
            onClick={action => handleItemClick(id, action)}
          />
        </Tooltip>
      ))}
    </div>
  );

  const listItemsWithDropdown = sortedItems?.filter(item => item.name !== FOLDER_TYPE.RECYCLE_BIN).map(item => {
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

  const tableHeader = connectorsTableHeader.map(i => (
    <th key={i.name}>{i.name}</th>
  ));

  const tableRows = sortedItems?.filter(item => item.name !== FOLDER_TYPE.RECYCLE_BIN).map(item => {
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
        connectType={item.kind || TABLE_CELL_EMPTY_VALUE}
        symlayerCount={item.symlayer_count || TABLE_CELL_EMPTY_VALUE}
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
      <EditConnectorModal visible={isEditConnModalVisible} onClose={closeConnectorModalHandler} />
    </div>
  );
};

export default ConnectorsList;
