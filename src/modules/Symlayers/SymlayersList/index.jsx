import lodash from 'lodash';
/* eslint-disable no-unused-vars */
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

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
  REDIRECT_LINKS,
  TABLE_CELL_EMPTY_VALUE,
} from '../../../common/constants/common';
import { setObjectFavoriteStatus } from '../../../data/actions/app';
import {
  getUniversesFolderChildren,
  getUniversesFolderId,
  openUniverse,
} from '../../../data/actions/universes';
import { setLoadingUniverse } from '../../../data/reducers/schemaDesigner';
import FolderIcon from '../../../layout/assets/folderIcon.svg';
import UniverseIcon from '../../../layout/assets/icons/universeIcon.svg';
import {
  FOLDER_DROPDOWN_ACTIONS,
  FOLDER_ITEM_DROPDOWN_ACTIONS,
  connectorsTableHeader,
  sortFoldersAndItems,
} from '../helper';
import styles from './SymlayersList.module.scss';

const ConnectorsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const universes = useSelector((state) => state.app.data.universes);
  const unvRootFolderId = useSelector(
    (state) => state.app.data.universesFolderId,
  );
  const isUnvLoading = useSelector(
    (state) => state.app.schemaDesigner.isUnvLoading,
  );

  useEffect(() => {
    dispatch(getUniversesFolderId({ folderType: 'USER_UNV' }));
  }, []);

  useEffect(() => {
    if (isUnvLoading) {
      navigate(REDIRECT_LINKS.SYMLAEYERS);
      dispatch(setLoadingUniverse(false));
    }
  }, [isUnvLoading]);

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

  const goToRootFolder = () => {
    dispatch(getUniversesFolderChildren({ id: unvRootFolderId }));
    setFoldersIdHistory([unvRootFolderId]);
    setFoldersNameHistory([BREADCRUMBS_ROOT]);
    setCurrentFolderIndex(0);
  };

  useEffect(() => {
    if (universes) {
      setSortedItems(sortFoldersAndItems(universes.list));
    }
  }, [universes]);

  useEffect(() => {
    if (currentFolderIndex === 0 && unvRootFolderId) {
      goToRootFolder();
    } else if (unvRootFolderId) {
      dispatch(
        getUniversesFolderChildren({
          id: foldersIdHistory[currentFolderIndex],
        }),
      );
    }
  }, [currentFolderIndex]);

  useEffect(() => {
    if (unvRootFolderId) {
      goToRootFolder();
    }
  }, [unvRootFolderId]);

  useEffect(() => {
    setActionButtonIsDisable({
      prev: !currentFolderIndex,
      next:
        currentFolderIndex === foldersIdHistory.length - 1 ||
        currentFolderIndex === 0,
      up: !currentFolderIndex,
    });
  }, [currentFolderIndex]);

  const onFolderDoubleClick = (folder) => {
    setFoldersIdHistory([...foldersIdHistory, folder.id]);
    setFoldersNameHistory([...foldersNameHistory, folder.name]);
    setCurrentFolderIndex((prev) => prev + 1);
  };

  const onSymLayerDoubleClick = (item) => {
    dispatch(openUniverse({ id: item.id, getData: 1 }, item.name));
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
    // some action
  };

  const handleEditClick = (id) => {
    setEditListItemId(id);
  };

  // Добаялем или удаляем из Избранного.
  // id - айди объекта
  // kind - типо объекта
  // isExclude - признак удаления, передаем 1, если хотим удалить
  const handleSetFavoritesStatus = (id, kind, isExclude) => {
    dispatch(setObjectFavoriteStatus({ id, kind, isExclude }));
  };

  const handleItemClick = (id, action, kind) => {
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
      case 'addToFavorites':
        handleSetFavoritesStatus(id, kind);
        break;
      case 'removeFromFavorites':
        handleSetFavoritesStatus(id, kind, 1);
        break;
      default:
        console.log(action);
    }
  };

  const getUniverseDropdownItems = (id, kind) => (
    <div className={styles.itemsWrapper}>
      {FOLDER_ITEM_DROPDOWN_ACTIONS.map((item) => (
        <Tooltip
          key={item.title}
          overlay={<div className={styles.tooltip}>{item.title}</div>}
          trigger={['hover']}
        >
          <DropdownItem
            className={styles.dropdownItem}
            onClick={(action) => handleItemClick(id, action, kind)}
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
    ?.filter((item) => item.name !== 'Корзина')
    .map((item) => {
      const isFolder = item.kind === 'FLD';

      const currentId = isFolder ? `folder_${item.id}` : item.id;

      const menu = isFolder
        ? getFolderDropdownItems(`folder_${item.id}`)
        : getUniverseDropdownItems(item.id, item.kind);

      return (
        <Fragment key={isFolder ? `folder_${item.id}` : item.id}>
          {editListItemId === currentId ? (
            <ListItemEdit
              key={isFolder ? `folder_${item.id}` : item.id}
              value={item.name || item.name}
              // TODO: implement submit function
              // onSubmit={onItemEditSubmit}
              onBlur={() => setEditListItemId(null)}
            />
          ) : (
            <ListItem
              className={styles.folderItemsColumnView}
              name={isFolder ? item.name : item.name}
              onDoubleClick={
                isFolder
                  ? () => onFolderDoubleClick(item)
                  : () => onSymLayerDoubleClick(item)
              }
              icon={isFolder ? <FolderIcon /> : <UniverseIcon />}
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
    ?.filter((item) => item.name !== 'Корзина')
    .map((item) => {
      const isFolder = item.kind === 'FLD';

      const currentId = isFolder ? `folder_${item.id}` : item.id;

      const menu = isFolder
        ? getFolderDropdownItems(`folder_${item.id}`)
        : getUniverseDropdownItems(item.id);

      return (
        <ListTableRow
          key={currentId}
          onDoubleClick={
            isFolder
              ? () => onFolderDoubleClick(item)
              : () => onSymLayerDoubleClick(item)
          }
          isEditMode={editListItemId === currentId}
          onEditEnd={() => setEditListItemId(null)}
          icon={isFolder ? <FolderIcon /> : <UniverseIcon />}
          name={item.name}
          menu={menu}
          connectType={item.desc || TABLE_CELL_EMPTY_VALUE}
          symlayerCount={null}
        />
      );
    });

  return (
    <div className={styles.root}>
      <div className={styles.title}>Список семантических слоев</div>
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
      {!lodash.isEmpty(universes) ? (
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

export default ConnectorsList;
