/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import clsx from 'clsx';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ReactComponent as SearchIcon } from '../../../layout/assets/icons/search.svg';
import { ReactComponent as AddTableIcon } from '../../../layout/assets/icons/tables_add.svg';
import { ReactComponent as FiltersIcon } from '../../../layout/assets/icons/tables_filters.svg';
import { ReactComponent as ViewsIcon } from '../../../layout/assets/icons/views_show.svg';
import HierTreeView from './HierTreeView';
import styles from './Sidebar.module.scss';

function Sidebar({ onSelect, ...props }) {
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
    </div>
  );
}

export default Sidebar;
