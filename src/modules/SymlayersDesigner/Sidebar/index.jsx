/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import clsx from 'clsx';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ReactComponent as SearchIcon } from '../../../layout/assets/icons/search.svg';
import { ReactComponent as AddTableIcon } from '../../../layout/assets/icons/tablesAdd.svg';
import { ReactComponent as FiltersIcon } from '../../../layout/assets/icons/tablesFilters.svg';
import { ReactComponent as ViewsIcon } from '../../../layout/assets/icons/viewsShow.svg';
import { ReactComponent as SaveIcon } from '../../../layout/assets/icons/tableSave.svg';
import { ReactComponent as FolderIcon } from '../../../layout/assets/folderIcon.svg';
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
            {activeTab === 0 && <span>дизайнер схемы данных</span>} 
          </div>
          {activeTab === 0 && <SaveIcon />}
          <div
            className={clsx(styles.tab, activeTab === 1 && styles.activeTab)}
            onClick={handleSelectTab(1)}
          >
            Объекты
            {activeTab === 1 && <span>дизайнер семантического слоя</span>} 
          </div>
          {activeTab === 1 && <SaveIcon />}
        </div>

        <div className={styles.actions}>
          <div onClick={handleCollapse}>
            <hr className={styles.divider} />
          </div>
        </div>
      </div>
      {!collapsed && (
        <div className={styles.content}>
          {activeTab === 0 ? (
            <>
              <div className={styles.tableActions}>
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
              </div>
              <div className={styles.owner}>
                <FolderIcon />
                <span>Owner</span>
              </div>
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
