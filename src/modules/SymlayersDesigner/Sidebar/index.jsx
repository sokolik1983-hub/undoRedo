/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as SearchIcon } from '../../../layout/assets/icons/search.svg';
import { ReactComponent as AddTableIcon } from '../../../layout/assets/icons/tablesAdd.svg';
import { ReactComponent as FiltersIcon } from '../../../layout/assets/icons/tablesFilters.svg';
import { ReactComponent as ViewsIcon } from '../../../layout/assets/icons/viewsShow.svg';
import { ReactComponent as SaveIcon } from '../../../layout/assets/icons/tableSave.svg';
import { ReactComponent as OwnerIcon } from '../../../layout/assets/icons/ownerIcon.svg';
import { ReactComponent as UnknownItemIcon } from '../../../layout/assets/icons/unknownTypeIcon.svg';
import { ReactComponent as GaugeIcon } from '../../../layout/assets/queryPanel/gauge_icon.svg';
import { ReactComponent as MeasIcon } from '../../../layout/assets/queryPanel/measurementIcon.svg';
import { ReactComponent as AttrIcon } from '../../../layout/assets/queryPanel/attributeIcon.svg';
import { setColoredValue, setShowDataList } from '../../../data/reducers/schemaDesigner';
import TextInput from '../../../common/components/TextInput';
import { ReactComponent as Magnifier } from '../../../layout/assets/magnifier.svg';
import HierTreeView from './HierTreeView';
import styles from './Sidebar.module.scss';
import { setCreateObjectModal } from '../../../data/actions/universes';
import ObjectLayer from './ObjectLayer';


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

  const objectsLayers = useSelector(
    state => state.app.schemaDesigner.objectsLayerList
  );

  const handleCollapse = () => {
    setCollapsed(prev => !prev);
  };

  const handleSelectTab = value => () => {
    setActiveTab(value);
  };

  const handleObjectDrop = (e, fieldName) => {
    dispatch(setCreateObjectModal(e, fieldName));
  };

  useEffect(() => {
    if (!selectedTables.length) {
      setTables([]);
    }
    setTables(selectedTables)
  }, [selectedTables]);

  const handleShowDataList = (event) => {
    if(event.key === 'Enter' && coloredValue.length) {
      event.preventDefault();
      dispatch(setShowDataList());
      setShowingDataList(true);
    } else if(event.key === 'Enter') {
      dispatch(setShowDataList());
      setShowingDataList(false);
    }
  };

  return (
    <div>
      <div className={styles.root}>
        <div className={styles.tabs}>
          <div
            className={clsx(styles.tab,styles.tabTable, activeTab === 0 ? styles.activeTabTable : styles.notActiveTabTable)}
            onClick={handleSelectTab(0)}
          >
            {activeTab === 0 && <span className={styles.tabDescr}>дизайнер схемы данных</span>} 
            Таблицы
            <div className={styles.iconTableWrap}>
              {activeTab === 0 && <SaveIcon />}
            </div>
          </div>
          <div
            className={clsx(styles.tab, styles.tabObject, activeTab === 1 && styles.activeTabObject, activeTab === 0 && styles.notActiveTabObject)}
            onClick={handleSelectTab(1)}
          >
            {activeTab === 1 && <span className={styles.tabDescr}>дизайнер семантического слоя</span>} 
            Объекты
            <div className={styles.iconObjectWrap}>
              {activeTab === 1 && <SaveIcon />}
            </div>
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
                <div className={styles.search}>
                  <TextInput
                    className={styles.searchInput}
                    onKeyPress={handleShowDataList}
                    value={coloredValue}
                    onChange={(event) => dispatch(setColoredValue(event.target.value))}
                  />
                  <Magnifier className={styles.magnifier} onClick={() => {dispatch(setShowDataList()); setShowingDataList(true)}} />
                </div>
                <div className={styles.tableFilters}>
                  <ViewsIcon />
                  <FiltersIcon />
                </div>
              </div>
              <div className={styles.owner}>
                <OwnerIcon />
                <span>Owner</span>
              </div>
              <div className={styles.contentData}>
                { showingDataList ? dataList.map(i => 
                (
                  <div>
                    <div className={styles.listItemWrapper}>
                      <div>
                        <ViewsIcon />
                      </div>
                      <div className={styles.listItemName}>{i.name}</div>
                    </div>
                    {i.line.map(el => (
                      <div className={styles.listItemFieldWrapper}>
                        <UnknownItemIcon />
                        <div className={styles.listItemField}>{el}</div>
                      </div>
                    ))}
                  </div>
                  )
                )
                : 
                (
                  <HierTreeView data={connectorObjects} onSelect={onSelect} />
              )}
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
              <div className={styles.objectsActions}>
                <div className={styles.search}>
                  <TextInput
                    className={styles.searchInputObjects}
                    onKeyPress={handleShowDataList}
                    value={coloredValue}
                    onChange={(event) => dispatch(setColoredValue(event.target.value))}
                  />
                  <Magnifier className={styles.magnifier} onClick={() => {dispatch(setShowDataList()); setShowingDataList(true)}} />
                </div>
                <div className={styles.objectsFilters}>
                  <div>
                    <GaugeIcon />
                  </div>
                  <div>
                    <AttrIcon />
                  </div>
                  <div>
                    <MeasIcon />
                  </div>
                </div>
              </div>
              <div className={styles.contentData}>
                { showingDataList ? dataList.map(i => 
                (
                  <div>
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
                  </div>
                  )
                )
                : 
                (
                  <div className={styles.objectsData}>
                    {objectsLayers.map(object => (
                      <ObjectLayer field={object} />
                    ))} 
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
      </div>
    </div>
  );
}

export default Sidebar;
