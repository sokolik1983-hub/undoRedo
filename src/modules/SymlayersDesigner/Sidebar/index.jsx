import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './Sidebar.module.scss';

import { ReactComponent as AddTableIcon } from '../../../layout/assets/icons/tables_add.svg';
import { ReactComponent as SearchIcon } from '../../../layout/assets/icons/search.svg';
import { ReactComponent as ViewsIcon } from '../../../layout/assets/icons/views_show.svg';
import { ReactComponent as FiltersIcon } from '../../../layout/assets/icons/tables_filters.svg';

function Sidebar() {
  const [activeTab, setActiveTab] = useState(0);

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
          <div>-</div>
          <div>x</div>
        </div>
      </div>
      <div className={styles.content}>
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
      </div>
    </div>
  );
}

export default Sidebar;
