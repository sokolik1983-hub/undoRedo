import { useMemo, useEffect, useState, Fragment } from 'react';
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
import { ReactComponent as UniverseIcon } from '../../../layout/assets/icons/universeIcon.svg';
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

  const listItems = foldersHistory[currentFolderIndex]?.children;
  const listItemsWithDropdown = listItems?.map(item => {
    const { isFolder } = item;

    const currentId = isFolder ? `folder_${item.folder_id}` : item.id;

    const menu = isFolder
      ? getFolderDropdownItems(`folder_${item.folder_id}`)
      : getUniverseDropdownItems(item.id);

    return (
      <Fragment key={isFolder ? `folder_${item.folder_id}` : item.id}>
        {editListItemId === currentId ? (
          <ListItemEdit
            key={isFolder ? `folder_${item.folder_id}` : item.id}
            value={item.folder_name || item.name}
            // TODO: implement submit function
            // onSubmit={onItemEditSubmit}
            onBlur={() => setEditListItemId(null)}
          />
        ) : (
          <ListItem
            className={styles.folderItemsColumnView}
            name={isFolder ? item.folder_name : item.name}
            onDoubleClick={isFolder ? () => onFolderDoubleClick(item) : null}
            icon={isFolder ? <FolderIcon /> : <UniverseIcon />}
            menu={menu}
          />
        )}
      </Fragment>
    );
  });

  const tableHeader = connectorsTableHeader.map(i => (
    <th key={i.name}>{i.name}</th>
  ));
  const tableRows = listItems?.map(item => {
    const { isFolder } = item;

    const currentId = isFolder ? `folder_${item.folder_id}` : item.id;

    const menu = isFolder
      ? getFolderDropdownItems(`folder_${item.folder_id}`)
      : getUniverseDropdownItems(item.id);

    return (
      <ListTableRow
        key={currentId}
        onDoubleClick={isFolder ? () => onFolderDoubleClick(item) : null}
        isEditMode={editListItemId === currentId}
        onEditEnd={() => setEditListItemId(null)}
        icon={isFolder ? <FolderIcon /> : <UniverseIcon />}
        name={isFolder ? item.folder_name : item.name}
        menu={menu}
        connectType={TABLE_CELL_EMPTY_VALUE}
        symlayerCount={null}
      />
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
