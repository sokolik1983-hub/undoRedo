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
} from './helper';
import { ReactComponent as FolderIcon } from '../../../layout/assets/folderIcon.svg';
import { ReactComponent as ConnectorIcon } from '../../../layout/assets/connectorIcon.svg';
import {
  BREADCRUMBS_ROOT,
  TABLE_CELL_EMPTY_VALUE
} from '../../../common/constants/common';
import styles from './RecycleBinList.module.scss';
import Preloader from '../../../common/components/Preloader/Preloader';
import { getTrashFolderId, getTrashFolderChildren } from '../../../data/actions/trash';
import Tooltip from '../../../common/components/Tooltip';
import { ITEM_TYPE } from '../types';

const RecycleBinList = () => {
  const dispatch = useDispatch();

  const trashOther = useSelector(state => state.app.trash.trash);
  const trashCon = useSelector(state => state.app.trash.connectorTrash);
  const trashRep = useSelector(state => state.app.trash.reportTrash)

  const trashConRootFolderId = useSelector(state => state.app.trash.trashConFolderId);
  const trashRepRootFolderId = useSelector(state => state.app.trash.trashRepFolderId);

  const trashOtherIsLoad = useSelector(state => state.app.trash.otherTrashIsLoad);
  const trashConIsLoad = useSelector(state => state.app.trash.connectorTrashIsLoad);
  const trashRepIsLoad = useSelector(state => state.app.trash.reportTrashIsLoad);

  useEffect(() => {
    dispatch(getTrashFolderId({folderType: 'USER_CN_REC_BIN'}, 'CN'));
    dispatch(getTrashFolderId({folderType: 'USER_REP_REC_BIN'}, 'REP'));
  }, []);

  const [trash, setTrash] = useState([]);
  const [foldersIdHistory, setFoldersIdHistory] = useState([]);
  const [foldersNameHistory, setFoldersNameHistory] = useState([]);
  const [sortedItems, setSortedItems] = useState([]);
  const [currentFolderIndex, setCurrentFolderIndex] = useState(0);
  const [actionButtonIsDisable, setActionButtonIsDisable] = useState({
    prev: true,
    next: false,
    up: true
  });
  const [multiColumnView, setMultiColumnView] = useState(false);
  const [searchValue, setSearchValue] = useState();
  const [editListItemId, setEditListItemId] = useState();

  const goToRootFolder = () => {
    dispatch(getTrashFolderChildren({id: trashConRootFolderId}, 'CN'));
    dispatch(getTrashFolderChildren({id: trashRepRootFolderId}, 'REP'));
    setFoldersIdHistory([]);
    setFoldersNameHistory([BREADCRUMBS_ROOT]);
    setCurrentFolderIndex(0);
  };

  useEffect(() => {
    if (trash.length) {
      setSortedItems(trash);
    }
  }, [trash]);

  useEffect(() => {
    setTrash([]);
    if (trashConIsLoad && trashRepIsLoad) {
      setTrash([...trashCon, ...trashRep]);
    } else if (trashOtherIsLoad) {
      setTrash([...trashOther]);
    }
  }, [trashOtherIsLoad, trashConIsLoad, trashRepIsLoad]);

  useEffect(() => {
    if (currentFolderIndex === 0 && trashConRootFolderId && trashRepRootFolderId) {
      goToRootFolder();
    } else if (currentFolderIndex !== 0) {
      dispatch(getTrashFolderChildren({id: foldersIdHistory[currentFolderIndex]}));
    }
  }, [currentFolderIndex])

  useEffect(() => {
    if (trashConRootFolderId && trashRepRootFolderId) {
      goToRootFolder();
    }
  }, [trashConRootFolderId, trashRepRootFolderId])

  useEffect(() => {
    setActionButtonIsDisable({
      prev: !currentFolderIndex,
      next: currentFolderIndex === foldersIdHistory.length - 1 || currentFolderIndex === 0,
      up: !currentFolderIndex
    });
  }, [currentFolderIndex]);

  const onFolderDoubleClick = folder => {
    setFoldersIdHistory([...foldersIdHistory, folder.id]);
    setFoldersNameHistory([...foldersNameHistory, folder.name]);
    setCurrentFolderIndex(prev => prev + 1);
  };

  const getBreadcrumbs = () => {
    return foldersNameHistory
      .map(i => i)
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

  const listItemsWithDropdown = sortedItems?.map(item => {
    const isFolder = item.kind === 'FLD';

    const currentId = isFolder ? `folder_${item.id}` : item.id;

    const menu = isFolder
      ? getFolderDropdownItems(`folder_${item.id}`)
      : getUniverseDropdownItems(item.id);

    return (
      <Fragment key={isFolder ? `folder_${item.id}` : item.id}>
        {editListItemId === currentId ? (
          <ListItemEdit
            key={isFolder ? `folder_${item.id}` : item.id}
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
  const tableRows = sortedItems?.map(item => {
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
        connectType={ITEM_TYPE[item.kind] || TABLE_CELL_EMPTY_VALUE}
        symlayerCount={item.drop_dt || TABLE_CELL_EMPTY_VALUE}
      />
    );
  });

  return (
    <div className={styles.root}>
      <div className={styles.title}>Список удаленных обьектов</div>
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
      {!lodash.isEmpty(trash) ? (
        <List
          listItems={listItemsWithDropdown}
          multiColumnView={multiColumnView}
          tableHeader={tableHeader}
          tableRows={tableRows}
        />
      ) : (
        <Preloader />
      )}
    </div>
  );
};

export default RecycleBinList;
