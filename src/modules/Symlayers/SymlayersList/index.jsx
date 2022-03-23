/* eslint-disable react/jsx-wrap-multilines */
import { useMemo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import lodash from 'lodash';
import ListNavBar from '../../../common/components/ListNavBar/ListNavBar';
import List from '../../../common/components/List/List';
import Dropdown from '../../../common/components/Dropdown';
import ListItem from '../../../common/components/List/ListItem/ListItem';
import ListItemEdit from '../../../common/components/List/ListItemEdit/ListItemEdit';
import DropdownItem from '../../../common/components/Dropdown/DropdownItem';
import ListTableRowWithDropdown from '../../../common/components/List/ListTableView/ListTableRowWithDropdown/ListTableRowWithDropdown';
import {
  connectorsTableHeader,
  FOLDER_DROPDOWN_ACTIONS,
  FOLDER_ITEM_DROPDOWN_ACTIONS,
  sortFoldersAndItems
} from '../helper';
import { ReactComponent as FolderIcon } from '../../../layout/assets/folder-icon.svg';
import { ReactComponent as UniverseIcon } from '../../../layout/assets/icons/universe-icon.svg';
import {
  BREADCRUMBS_ROOT,
  TABLE_CELL_EMPTY_VALUE
} from '../../../common/constants/common';
import styles from './SymlayersList.module.scss';
import Tooltip from '../../../common/components/NewTooltip/Tooltip';
import Preloader from '../../../common/components/Preloader/Preloader';
import { getUniverses } from '../../../data/actions/universes';

const ConnectorsList = () => {
  const dispatch = useDispatch();
  const universes = useSelector(state => state.app.data.universes);

  useEffect(() => {
    dispatch(getUniverses());
  }, []);

  const rootFolder = useMemo(() => {
    if (!universes.children) return universes;
    const sortedConnectorsChildren = sortFoldersAndItems(universes.children);

    return {
      ...universes,
      children: sortedConnectorsChildren
    };
  }, [universes]);

  const [foldersHistory, setFoldersHistory] = useState([rootFolder]);
  const [currentFolderIndex, setCurrentFolderIndex] = useState(0);
  const [actionButtonIsDisable, setActionButtonIsDisable] = useState({
    prev: true,
    next: true,
    up: true
  });
  const [multiColumnView, setMultiColumnView] = useState(true);
  const [searchValue, setSearchValue] = useState();
  const [editListItemId, setEditListItemId] = useState();

  useEffect(() => {
    setFoldersHistory([rootFolder]);
  }, [universes]);

  useEffect(() => {
    setActionButtonIsDisable({
      prev: !currentFolderIndex,
      next: currentFolderIndex === foldersHistory.length - 1,
      up: !currentFolderIndex
    });
  }, [currentFolderIndex]);

  const onFolderDoubleClick = folder => {
    const folderWithSortedChildren = {
      ...folder,
      children: sortFoldersAndItems(folder.children)
    };

    setFoldersHistory([
      ...foldersHistory.slice(0, currentFolderIndex + 1),
      folderWithSortedChildren
    ]);
    setCurrentFolderIndex(prev => prev + 1);
  };

  const getBreadcrumbs = () =>
    foldersHistory
      .map((i, idx) => (idx ? i.folder_name : BREADCRUMBS_ROOT))
      .slice(0, currentFolderIndex + 1)
      .join(` / `);

  const moveToRootFolder = () => {
    setCurrentFolderIndex(0);
    setFoldersHistory([rootFolder]);
  };

  const moveToPrevFolder = () => {
    setCurrentFolderIndex(prev => (prev === 0 ? 0 : prev - 1));
  };

  const moveToNextFolder = () => {
    setCurrentFolderIndex(prev =>
      prev === foldersHistory.length ? prev : prev + 1
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

  const getUniverseDropdownItems = id =>
    FOLDER_ITEM_DROPDOWN_ACTIONS.map(item => (
      <Tooltip key={item.action} text={item.title} space={5}>
        <DropdownItem
          className={styles.dropdownItem}
          onClick={action => handleItemClick(id, action)}
          item={item}
        />
      </Tooltip>
    ));

  const getFolderDropdownItems = id =>
    FOLDER_DROPDOWN_ACTIONS.map(item => (
      <Tooltip key={item.action} text={item.title} space={5}>
        <DropdownItem
          className={styles.dropdownItem}
          onClick={action => handleItemClick(id, action)}
          item={item}
        />
      </Tooltip>
    ));

  const listItems = foldersHistory[currentFolderIndex]?.children;
  const listItemsWithDropdown = listItems?.map(item => {
    const { isFolder } = item;
    return (
      <>
        {editListItemId ===
        (isFolder ? `folder_${item.folder_id}` : item.id) ? (
          <ListItemEdit
            key={isFolder ? `folder_${item.folder_id}` : item.id}
            value={item.folder_name || item.name}
            // TODO: implement submit function
            // onSubmit={onItemEditSubmit}
            onBlur={() => setEditListItemId(null)}
          />
        ) : (
          <Dropdown
            key={isFolder ? `folder_${item.folder_id}` : item.id}
            className={styles.dropdownColumn}
            itemsWrapper={styles.itemsWrapper}
            mainButton={
              <Tooltip
                placement="bottom-left"
                text={isFolder ? item.folder_name : item.name}
                space={5}
              >
                <ListItem
                  className={styles.folderItemsColumnView}
                  name={isFolder ? item.folder_name : item.name}
                  onDoubleClick={
                    isFolder ? () => onFolderDoubleClick(item) : null
                  }
                  icon={isFolder ? <FolderIcon /> : <UniverseIcon />}
                />
              </Tooltip>
            }
          >
            {isFolder
              ? getFolderDropdownItems(`folder_${item.folder_id}`)
              : getUniverseDropdownItems(item.id)}
          </Dropdown>
        )}
      </>
    );
  });

  const tableHeader = connectorsTableHeader.map(i => <th>{i.name}</th>);
  const tableRows = listItems?.map(item => {
    const { isFolder } = item;
    return (
      <Tooltip
        key={isFolder ? `folder_${item.folder_id}` : item.id}
        placement="bottom-left"
        text={isFolder ? item.folder_name : item.name}
        space={5}
      >
        <ListTableRowWithDropdown
          onDoubleClick={isFolder ? () => onFolderDoubleClick(item) : null}
          cells={
            <>
              <td>
                {editListItemId ===
                (isFolder ? `folder_${item.folder_id}` : item.id) ? (
                  <ListItemEdit
                    key={isFolder ? `folder_${item.folder_id}` : item.id}
                    value={item.folder_name || item.name}
                    // TODO: implement submit function
                    // onSubmit={}
                    onBlur={() => setEditListItemId(null)}
                  />
                ) : (
                  <ListItem
                    className={styles.folderItems}
                    name={isFolder ? item.folder_name : item.name}
                    icon={isFolder ? <FolderIcon /> : <UniverseIcon />}
                  />
                )}
              </td>
              <td>{TABLE_CELL_EMPTY_VALUE}</td>
            </>
          }
        >
          {isFolder
            ? getFolderDropdownItems(`folder_${item.folder_id}`)
            : getUniverseDropdownItems(item.id)}
        </ListTableRowWithDropdown>
      </Tooltip>
    );
  });

  return (
    <div className={styles.root}>
      <div className={styles.title}>Список юниверсов</div>
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
