/* eslint-disable react/prop-types */
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateObjectLayerModal from '../CreateObjectLayerModal/index';
import { ReactComponent as SearchIcon } from '../../../layout/assets/icons/search.svg';
import { ReactComponent as AddTableIcon } from '../../../layout/assets/icons/tablesAdd.svg';
import { ReactComponent as FiltersIcon } from '../../../layout/assets/icons/tablesFilters.svg';
import { ReactComponent as ViewsIcon } from '../../../layout/assets/icons/viewsShow.svg';
import { ReactComponent as SaveIcon } from '../../../layout/assets/icons/tableSave.svg';
import { ReactComponent as OwnerIcon } from '../../../layout/assets/icons/ownerIcon.svg';
import HierTreeView from './HierTreeView';
import styles from './Sidebar.module.scss';
import { setCreateObjectModal } from '../../../data/actions/universes';
import ObjectLayer from './ObjectLayer';


function Sidebar({ onSelect }) {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const connectorObjects = useSelector(
    state => state.app.schemaDesigner.connectorObjects
  );

  const objectsLayers = useSelector(
    state => state.app.schemaDesigner.objectsLayerList
  );

    useEffect(() => {
      console.log(objectsLayers)
    }, [objectsLayers]);

  const handleCollapse = () => {
    setCollapsed(prev => !prev);
  };

  const handleSelectTab = value => () => {
    setActiveTab(value);
  };

  const handleObjectDrop = (e, fieldName) => {
    dispatch(setCreateObjectModal(e, fieldName));
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
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => dispatch(setCreateObjectModal(true))}
          >
            Создать
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
                <OwnerIcon />
                <span>Owner</span>
              </div>
              <div className={styles.contentData}>
                <HierTreeView data={connectorObjects} onSelect={onSelect} />
              </div>
            </>
          ) : (
            <div
              className={styles.contentObj}
              onDrop={e => {
              if(e.dataTransfer.getData('field')) 
                handleObjectDrop(JSON.parse(e.dataTransfer.getData('field')), e)
              }}
              onDragOver={e => e.preventDefault()}
            >
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
                <div className={styles.objectsData}>
                  {objectsLayers.map(object => (
                    <ObjectLayer field={object} />
                  ))}
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
