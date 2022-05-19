/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateObjectLayerModal from '../CreateObjectLayerModal/index';
import { ReactComponent as SearchIcon } from '../../../layout/assets/icons/search.svg';
import { ReactComponent as AddTableIcon } from '../../../layout/assets/icons/tablesAdd.svg';
import { ReactComponent as FiltersIcon } from '../../../layout/assets/icons/tablesFilters.svg';
import { ReactComponent as ViewsIcon } from '../../../layout/assets/icons/viewsShow.svg';
import { ReactComponent as SaveIcon } from '../../../layout/assets/icons/tableSave.svg';
import { ReactComponent as OwnerIcon } from '../../../layout/assets/icons/ownerIcon.svg';
import { ReactComponent as UnknownItemIcon } from '../../../layout/assets/icons/unknownTypeIcon.svg';
import { setColoredValue, setShowDataList } from '../../../data/reducers/schemaDesigner';
import TextInput from '../../../common/components/TextInput';
import { ReactComponent as Magnifier } from '../../../layout/assets/magnifier.svg';
import HierTreeView from './HierTreeView';
import styles from './Sidebar.module.scss';
import { setCreateObjectModal } from '../../../data/actions/universes';


function Sidebar({ onSelect }) {

  const { selectedTables, coloredValue, dataList } = useSelector(
    state => state.app.schemaDesigner
  );

  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const [showingDataList, setShowingDataList] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [tables, setTables] = useState(selectedTables);

  const connectorObjects = useSelector(
    state => state.app.schemaDesigner.connectorObjects
  );

  const handleCollapse = () => {
    setCollapsed(prev => !prev);
  };

  const handleSelectTab = value => () => {
    setActiveTab(value);
  };

  useEffect(() => {
    if (!selectedTables.length) {
      setTables([]);
    }
    setTables(selectedTables)
  }, [selectedTables]);

  const handleShowDAtaList = (event) => {
    if(event.key === 'Enter') {
      event.preventDefault();
      dispatch(setShowDataList());
      setShowingDataList(true);
    };
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
          <div
            className={clsx(styles.tab, activeTab === 2 && styles.activeTab)}
            onClick={handleSelectTab(2)}
          >
            Поиск
          </div>
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => dispatch(setCreateObjectModal(true))}
          >
            Создать
          </div>
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
                <OwnerIcon />
                <span>Owner</span>
              </div>
              <div className={styles.contentData}>
                <HierTreeView data={connectorObjects} onSelect={onSelect} />
              </div>
            </>
          ) : activeTab === 1 ? ( <></>) : (
            <div className={styles.wrapper}>
              <div className={styles.search}>
                <TextInput
                  className={styles.searchInput}
                  onKeyPress={handleShowDAtaList}
                  value={coloredValue}
                  onChange={(event) => dispatch(setColoredValue(event.target.value))}
                />
                <Magnifier className={styles.magnifier} onClick={() => {dispatch(setShowDataList()); setShowingDataList(true)}} />
              </div>
              <div className={styles.searchContentData}>
                <div className={styles.listWrapper}>
                  {showingDataList && dataList.map(i => 
                    (
                      <>
                        <div className={styles.listItemWrapper}>
                          <ViewsIcon />
                          <div className={styles.listItemName}>{i.name}</div>
                        </div>
                        {i.line.map(el => (
                          <div className={styles.listItemFieldWrapper}>
                            <UnknownItemIcon />
                            <div className={styles.listItemField}>{el}</div>
                          </div>
                        ))}
                      </>
                    )
                  )}
                </div>
              </div>
            </div>
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
