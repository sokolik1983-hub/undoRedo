import lodash from 'lodash';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import DropdownItem from '../../common/components/Dropdown/DropdownItem';
import FloatingButton from '../../common/components/FloatingButton';
import List from '../../common/components/List/List';
import ListItem from '../../common/components/List/ListItem/ListItem';
import ListItemEdit from '../../common/components/List/ListItemEdit/ListItemEdit';
import ListTableRow from '../../common/components/List/ListTableView/ListTableRow/ListTableRow';
import ListNavBar from '../../common/components/ListNavBar/ListNavBar';
import Preloader from '../../common/components/Preloader/Preloader';
import Tooltip from '../../common/components/Tooltip';
import {
  BREADCRUMBS_ROOT,
  REDIRECT_LINKS,
  TABLE_CELL_EMPTY_VALUE,
} from '../../common/constants/common';
import { PAGE } from '../../common/constants/pages';
// import { openReport } from '../../data/actions/newReportDesigner';
import { setObjectFavoriteStatus } from '../../data/actions/app';
import { deleteReport } from '../../data/actions/newReportDesigner';
import {
  getReportsFolderChildren,
  getReportsFolderId,
} from '../../data/actions/universes';
import { setCurrentPage } from '../../data/reducers/ui';
import ConnectorIcon from '../../layout/assets/connectorIcon.svg';
import CreateConnector from '../../layout/assets/createConnector.svg';
import FolderIcon from '../../layout/assets/folderIcon.svg';
import {
  FOLDER_DROPDOWN_ACTIONS,
  FOLDER_ITEM_DROPDOWN_ACTIONS_REPORTS,
  connectorsTableHeader,
  sortFoldersAndItems,
} from './helper';
import styles from './Reports.module.scss';

const Reports = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reports = useSelector((state) => state.app.data.listReports);
  const reportsRootFolderId = useSelector(
    (state) => state.app.data.reportsFolderId,
  );

  useEffect(() => {
    dispatch(setCurrentPage(PAGE.REPORTS));
    dispatch(getReportsFolderId({ folderType: 'USER_REP' }));
  }, []);

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
    dispatch(getReportsFolderChildren({ id: reportsRootFolderId }));
    setFoldersIdHistory([reportsRootFolderId]);
    setFoldersNameHistory([BREADCRUMBS_ROOT]);
    setCurrentFolderIndex(0);
  };

  useEffect(() => {
    if (reports) {
      setSortedItems(sortFoldersAndItems(reports.list));
    }
  }, [reports]);

  useEffect(() => {
    if (currentFolderIndex === 0 && reportsRootFolderId) {
      goToRootFolder();
    } else if (reportsRootFolderId) {
      dispatch(
        getReportsFolderChildren({
          id: foldersIdHistory[currentFolderIndex],
        }),
      );
    }
  }, [currentFolderIndex]);

  useEffect(() => {
    if (reportsRootFolderId) {
      goToRootFolder();
    }
  }, [reportsRootFolderId]);

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

  const handleOpenClick = (id) => {
    navigate(`${REDIRECT_LINKS.REPORT_SHOW}/${id}`, { replace: true });
  };

  const handleDeleteClick = (id) => {
    dispatch(
      deleteReport({ id }, () => {
        dispatch(getReportsFolderId({ folderType: 'USER_REP' }));
        dispatch(getReportsFolderChildren({ id: reportsRootFolderId }));
      }),
    );
  };

  const handleSetFavoritesStatus = (id, kind, isExclude) => {
    dispatch(setObjectFavoriteStatus({ id, kind, isExclude }));
    console.log('status');
  };

  const handleItemClick = (id, kind, action) => {
    console.log(id, kind, action);
    switch (action) {
      case 'open':
        handleOpenClick(id);
        break;
      case 'edit':
        handleEditClick(id);
        break;
      case 'delete':
        handleDeleteClick(id);
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
      {FOLDER_ITEM_DROPDOWN_ACTIONS_REPORTS.map((item) => (
        <Tooltip
          key={item.title}
          overlay={<div className={styles.tooltip}>{item.title}</div>}
          trigger={['hover']}
        >
          <DropdownItem
            className={styles.dropdownItem}
            onClick={(action) => handleItemClick(id, kind, action)}
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

      const currentId = item.id;

      const menu = isFolder
        ? getFolderDropdownItems(`folder_${item.id}`)
        : getUniverseDropdownItems(item.id, item.kind);

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
        {!lodash.isEmpty(reports) ? (
          <List
            listItems={listItemsWithDropdown}
            multiColumnView={multiColumnView}
            tableHeader={tableHeader}
            tableRows={tableRows}
          />
        ) : (
          <Preloader />
        )}
        <Link to="/report">
          <FloatingButton icon={<CreateConnector />} text="Создать отчет" />
        </Link>
      </div>
    </div>
  );
};

export default Reports;
