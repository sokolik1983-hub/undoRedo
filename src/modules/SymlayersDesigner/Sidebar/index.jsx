/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import clsx from 'clsx';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateObjectLayerModal from '../CreateObjectLayerModal/index';
import { ReactComponent as SearchIcon } from '../../../layout/assets/icons/search.svg';
import { ReactComponent as AddTableIcon } from '../../../layout/assets/icons/tablesAdd.svg';
import { ReactComponent as FiltersIcon } from '../../../layout/assets/icons/tablesFilters.svg';
import { ReactComponent as ViewsIcon } from '../../../layout/assets/icons/viewsShow.svg';
import HierTreeView from './HierTreeView';
import styles from './Sidebar.module.scss';
import { setCreateObjectModal } from '../../../data/actions/universes';

function Sidebar({ onSelect, ...props }) {
  const dispatch = useDispatch();

  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const connectorObjects = useSelector(
    state => state.app.schemaDesigner.connectorObjects
  );

  const handleCollapse = () => {
    setCollapsed(prev => !prev);
  };

  const handleSelectTab = value => () => {
    setActiveTab(value);
  };

  /* удалить когда перенесем кнопку открытия Создать  */
  const isCreateObjectModalOpened = useSelector(
    state => state.app.ui.modalCreateObjectVisible
  );
  /* удалить когда перенесем кнопку открытия Создать  */

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.tabs}>
          <div
            className={clsx(styles.tab, activeTab === 0 && styles.activeTab)}
            onClick={handleSelectTab(0)}
          >
            Таблицы
          </div>
          <div
            className={clsx(styles.tab, activeTab === 1 && styles.activeTab)}
            onClick={handleSelectTab(1)}
          >
            Объекты
          </div>
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => dispatch(setCreateObjectModal(true))}
          >
            Создать
          </div>
        </div>

        <div className={styles.actions}>
          <div onClick={handleCollapse}>-</div>
        </div>
      </div>
      {!collapsed && (
        <div className={styles.content}>
          {activeTab === 0 ? (
            <>
              {/* <div className={styles.tableActions}>
                <div>
                  <AddTableIcon />
                </div>
                <div className={styles.tableFilters}>
                  <div>
                    <SearchIcon />
                  </div>
                  <div>
                    <ViewsIcon />
                  </div>
                  <div>
                    <FiltersIcon />
                  </div>
                </div>
              </div> */}
              <div className={styles.contentData}>
                <HierTreeView data={connectorObjects} onSelect={onSelect} />
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      )}
      {isCreateObjectModalOpened && (
        <CreateObjectLayerModal visible={isCreateObjectModalOpened && true} />
      )}
    </div>
  );
}

export default Sidebar;
