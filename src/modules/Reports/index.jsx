import { useMemo, useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import lodash from 'lodash';
import { Link } from 'react-router-dom';
import ListNavBar from '../../common/components/ListNavBar/ListNavBar';
import List from '../../common/components/List/List';
import ListItem from '../../common/components/List/ListItem/ListItem';
import ListItemEdit from '../../common/components/List/ListItemEdit/ListItemEdit';
import DropdownItem from '../../common/components/Dropdown/DropdownItem';
import ListTableRow from '../../common/components/List/ListTableView/ListTableRow/ListTableRow';
import {
  connectorsTableHeader,
  FOLDER_DROPDOWN_ACTIONS,
  FOLDER_ITEM_DROPDOWN_ACTIONS,
  sortFoldersAndItems
} from './helper';
import { ReactComponent as FolderIcon } from '../../layout/assets/folderIcon.svg';
import { ReactComponent as ConnectorIcon } from '../../layout/assets/connectorIcon.svg';
import {
  BREADCRUMBS_ROOT,
  TABLE_CELL_EMPTY_VALUE
} from '../../common/constants/common';
import Tooltip from '../../common/components/NewTooltip/Tooltip';
import Preloader from '../../common/components/Preloader/Preloader';
import { PAGE } from '../../common/constants/pages';
import { setCurrentPage } from '../../data/reducers/ui';
import FloatingButton from '../../common/components/FloatingButton';
import { ReactComponent as CreateConnector } from '../../layout/assets/createConnector.svg';
import styles from './Reports.module.scss';
import { getListReports } from '../../data/actions/universes';

const Reports = () => {
  const dispatch = useDispatch();
  const connectors = useSelector(state => state.app?.data?.listReports);

  useEffect(() => {
    dispatch(setCurrentPage(PAGE.REPORTS));
    dispatch(getListReports());
  }, []);

  const rootFolder = useMemo(() => {
    if (!connectors?.children) return connectors;
    const sortedConnectorsChildren = sortFoldersAndItems(connectors.children);

    return {
      ...connectors,
      children: sortedConnectorsChildren
    };
  }, [connectors]);

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
  }, [connectors]);

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
        icon={isFolder ? <FolderIcon /> : <ConnectorIcon />}
        name={isFolder ? item.folder_name : item.name}
        menu={menu}
        connectType={item.connect_type_name || TABLE_CELL_EMPTY_VALUE}
        symlayerCount={item.symlayer_count || TABLE_CELL_EMPTY_VALUE}
      />
    );
  });

  return (
    <div className={styles.report}>
      <div className={styles.root}>
        <div className={styles.title}>Список отчетов</div>
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
        <Link to="/Universe/report/create/">
          <FloatingButton icon={<CreateConnector />} text="Создать отчет" />
        </Link>
      </div>
    </div>
  );
};

export default Reports;
