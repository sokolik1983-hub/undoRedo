import lodash from 'lodash';
import PropTypes from 'prop-types';
import { Fragment, useEffect, useMemo, useState } from 'react';
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
  TABLE_CELL_EMPTY_VALUE,
} from '../../../common/constants/common';
import { getAuditEvents } from '../../../data/actions/audit';
import ConnectorIcon from '../../../layout/assets/connectorIcon.svg';
import FolderIcon from '../../../layout/assets/folderIcon.svg';
import styles from './ConnectorsList.module.scss';
import {
  FOLDER_DROPDOWN_ACTIONS,
  FOLDER_ITEM_DROPDOWN_ACTIONS,
  sortFoldersAndItems,
} from './helper';

const ConnectorsList = ({ audit, auditHeaders }) => {
  const dispatch = useDispatch();
  const connectors = useSelector((state) => state.app.audit);

  useEffect(() => {
    dispatch(getAuditEvents({ filters: { ...connectors.filters } }));
  }, []);

  const rootFolder = useMemo(() => {
    if (!connectors.children) return connectors;
    const sortedConnectorsChildren = sortFoldersAndItems(connectors.children);

    return {
      ...connectors,
      children: sortedConnectorsChildren,
    };
  }, [connectors]);

  const [foldersHistory, setFoldersHistory] = useState([rootFolder]);
  const [currentFolderIndex, setCurrentFolderIndex] = useState(0);
  const [actionButtonIsDisable, setActionButtonIsDisable] = useState({
    prev: true,
    next: true,
    up: true,
  });
  const [multiColumnView, setMultiColumnView] = useState(false);
  const [searchValue, setSearchValue] = useState();
  const [editListItemId, setEditListItemId] = useState();

  useEffect(() => {
    setFoldersHistory([rootFolder]);
  }, [connectors]);

  useEffect(() => {
    setActionButtonIsDisable({
      prev: !currentFolderIndex,
      next: currentFolderIndex === foldersHistory.length - 1,
      up: !currentFolderIndex,
    });
  }, [currentFolderIndex]);

  const onFolderDoubleClick = (folder) => {
    const folderWithSortedChildren = {
      ...folder,
      children: sortFoldersAndItems(folder.children),
    };

    setFoldersHistory([
      ...foldersHistory.slice(0, currentFolderIndex + 1),
      folderWithSortedChildren,
    ]);
    setCurrentFolderIndex((prev) => prev + 1);
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
    setCurrentFolderIndex((prev) => (prev === 0 ? 0 : prev - 1));
  };

  const moveToNextFolder = () => {
    setCurrentFolderIndex((prev) =>
      prev === foldersHistory.length ? prev : prev + 1,
    );
  };

  const onSearch = async () => {
    // some action
  };

  const handleEditClick = (id) => {
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

  const listItems = foldersHistory[currentFolderIndex]?.events;
  const listItemsWithDropdown = audit?.map((item) => {
    const { isFolder } = item;

    const currentId = isFolder ? `folder_${item.folder_id}` : item.id;

    const menu = isFolder
      ? getFolderDropdownItems(`folder_${item.folder_id}`)
      : getUniverseDropdownItems(item.id);

    return (
      <Fragment key={isFolder ? `folder_${item.folder_id}` : item.id}>
        {editListItemId === currentId ? (
          <ListItemEdit
            value={item.folder_name || item.message}
            // TODO: implement submit function
            // onSubmit={onItemEditSubmit}
            onBlur={() => setEditListItemId(null)}
          />
        ) : (
          <ListItem
            className={styles.folderItemsColumnView}
            name={isFolder ? item.folder_name : item.message}
            onDoubleClick={isFolder ? () => onFolderDoubleClick(item) : null}
            icon={isFolder ? <FolderIcon /> : <ConnectorIcon />}
            menu={menu}
          />
        )}
      </Fragment>
    );
  });

  const tableHeader = auditHeaders?.map((i) => <th key={i.name}>{i.name}</th>);
  const tableRows = listItems?.map((item) => {
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
        name={isFolder ? item.folder_name : item.message}
        menu={menu}
        connectType={item.struct_name || TABLE_CELL_EMPTY_VALUE}
        symlayerCount={item.audit_time || TABLE_CELL_EMPTY_VALUE}
      />
    );
  });

  return (
    <div className={styles.root}>
      <div className={styles.title}>Аудит действий пользователей</div>
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
    </div>
  );
};

ConnectorsList.propTypes = {
  audit: PropTypes.array,
  auditHeaders: PropTypes.array,
};

export default ConnectorsList;
