import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TabPane from '../../../common/components/Tabs/TabPane/TabPane';
import Tabs from '../../../common/components/Tabs/Tabs';
import { EMPTY_STRING } from '../../../common/constants/common';
import { setCreateObjectModal } from '../../../data/actions/universes';
import { setShowDataList } from '../../../data/reducers/schemaDesigner';
import ObjectsPane from './ObjectsPane/ObjectsPane';
import styles from './Sidebar.module.scss';
import SideBarTabContent from './SideBarTabContent/SideBarTabContent';
import TablesPane from './TablesPane/TablesPane';

const Sidebar = ({ onSelect }) => {
  const { selectedTables, coloredValue, dataList } = useSelector(
    (state) => state.app.schemaDesigner,
  );

  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const [showingDataList, setShowingDataList] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedSchemes, setSelectedSchemes] = useState([]);
  const [searchValue, setSearchValue] = useState(EMPTY_STRING);
  const [searchMod, setSearchMod] = useState(false);
  const [searchObjValue, setSearchObjValue] = useState(EMPTY_STRING);
  // eslint-disable-next-line no-unused-vars
  const [tables, setTables] = useState(selectedTables);
  const [selectObjectLayer, setSelectObjectLayer] = useState(EMPTY_STRING);
  const [filterObjectModes, setFilterObjectModes] = useState([]);

  const connectorObjects = useSelector(
    (state) => state.app.schemaDesigner.connectorObjects,
  );

  const objectsLayers = useSelector(
    (state) => state.app.schemaDesigner.objectsLayerList,
  );

  const [objectsList, setObjectsList] = useState([]);

  useEffect(() => {
    if (objectsLayers.length) {
      setObjectsList(objectsLayers);
      setFilterObjectModes([]);
    }
  }, [objectsLayers]);

  const handleSelectObjectLayer = (id) => {
    setSelectObjectLayer(id);
    if (id === selectObjectLayer) {
      setSelectObjectLayer('');
    }
  };

  const handleCollapse = () => {
    setCollapsed((prev) => !prev);
  };

  const handleSelectTab = (value) => () => {
    setActiveTab(value);
  };

  const handleObjectDrop = () => {
    dispatch(setCreateObjectModal(true));
  };

  useEffect(() => {
    if (!selectedTables.length) {
      setTables([]);
    }
    setTables(selectedTables);
  }, [selectedTables]);

  const handleShowDataList = (event) => {
    if (event.key === 'Enter' && coloredValue.length) {
      event.preventDefault();
      dispatch(setShowDataList());
      setShowingDataList(true);
    } else if (event.key === 'Enter') {
      dispatch(setShowDataList());
      setShowingDataList(false);
    }
  };

  const searchTable = (event) => {
    if (event.key === 'Enter' && searchValue.length) {
      let result = JSON.parse(
        JSON.stringify(
          connectorObjects.filter((connector) =>
            connector.objectName
              .toUpperCase()
              .includes(searchValue.toUpperCase()),
          ),
        ),
      );
      result = result.map((item) => {
        item.opened = true;
        return item;
      });
      setSelectedSchemes(result);
    } else if (event.key === 'Enter') {
      setSelectedSchemes([]);
    }
  };

  const searchObject = (event) => {
    if (event.key === 'Enter' && searchObjValue.length) {
      const result = JSON.parse(
        JSON.stringify(
          objectsLayers.filter((object) =>
            object.name.toUpperCase().includes(searchObjValue.toUpperCase()),
          ),
        ),
      );
      setObjectsList(result);
    } else if (event.key === 'Enter') {
      setObjectsList(objectsLayers);
    }
  };

  const tab = (isActive, title, desc) =>
    isActive ? <SideBarTabContent title={title} desc={desc} /> : title;

  return (
    <div className={styles.root}>
      <Tabs defaultActive="1" tabItemClassName={styles.tabItem}>
        <TabPane
          tab={(isActive) => tab(isActive, 'Таблицы', 'дизайнер схемы данных')}
          idx="1"
        >
          <TablesPane onSelect={onSelect} />
        </TabPane>
        <TabPane
          tab={(active) =>
            tab(active, 'Объекты', 'дизайнер семантического слоя')
          }
          idx="2"
        >
          <ObjectsPane />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Sidebar;
