/* eslint-disable react/jsx-wrap-multilines */
import { useMemo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import lodash from 'lodash';
import { Link } from 'react-router-dom';
import ListNavBar from '../../common/components/ListNavBar/ListNavBar';
import List from '../../common/components/List/List';
import Dropdown from '../../common/components/Dropdown';
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
                  icon={isFolder ? <FolderIcon /> : <ConnectorIcon />}
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
        <ListTableRow
          onDoubleClick={isFolder ? () => onFolderDoubleClick(item) : null}
          cells={
            <>
              <td>
                {editListItemId ===
                (isFolder ? `folder_${item.folder_id}` : item.id) ? (
                  <ListItemEdit
                    key={isFolder ? `folder_${item.folder_id}` : item.id}
                    value={item.folder_name || item.name}
                  />
                ) : (
                  <ListItem
                    className={styles.folderItems}
                    name={isFolder ? item.folder_name : item.name}
                    icon={isFolder ? <FolderIcon /> : <ConnectorIcon />}
                  />
                )}
              </td>
              <td>{item.connect_type_name || TABLE_CELL_EMPTY_VALUE}</td>
              <td>{item.symlayer_count || TABLE_CELL_EMPTY_VALUE}</td>
            </>
          }
        >
          {isFolder
            ? getFolderDropdownItems(`folder_${item.folder_id}`)
            : getUniverseDropdownItems(item.id)}
        </ListTableRow>
      </Tooltip>
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
