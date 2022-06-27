/* eslint-disable import/no-named-as-default */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setShowDataList } from '../../../data/reducers/schemaDesigner';
import styles from './Sidebar.module.scss';
import { setCreateObjectModal } from '../../../data/actions/universes';
import Tabs from '../../../common/components/Tabs/Tabs';
import TabPane from '../../../common/components/Tabs/TabPane/TabPane';
import TablesPane from './TablesPane/TablesPane';
import ObjectsPane from './ObjectsPane/ObjectsPane';
import SideBarTabContent from './SideBarTabContent/SideBarTabContent';

const Sidebar = ({ onSelect }) => {
  const { selectedTables, coloredValue, dataList } = useSelector(
    state => state.app.schemaDesigner
  );

  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const [showingDataList, setShowingDataList] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedSchemes, setSelectedSchemes] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [tables, setTables] = useState(selectedTables);
  const [selectObjectLayer, setSelectObjectLayer] = useState('');
  const [filterObjectsMode, setFilterObjectMode] = useState(null);

  const connectorObjects = useSelector(
    state => state.app.schemaDesigner.connectorObjects
  );

  const objectsLayers = useSelector(
    state => state.app.schemaDesigner.objectsLayerList
  );
  const [objectsList, setObjectsList] = useState([]);

  useEffect(() => {
    if (objectsLayers.length) {
      setObjectsList(objectsLayers);
      setFilterObjectMode(null);
    }
  }, [objectsLayers]);

  const handleSelectObjectLayer = id => {
    setSelectObjectLayer(id);
    if (id === selectObjectLayer) {
      setSelectObjectLayer('');
    }
  };

  const handleCollapse = () => {
    setCollapsed(prev => !prev);
  };

  const handleSelectTab = value => () => {
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

  const handleShowDataList = event => {
    if (event.key === 'Enter' && coloredValue.length) {
      event.preventDefault();
      dispatch(setShowDataList());
      setShowingDataList(true);
    } else if (event.key === 'Enter') {
      dispatch(setShowDataList());
      setShowingDataList(false);
    }
  };

  const searchTable = event => {
    if (event.key === 'Enter' && searchValue.length) {
      let result = JSON.parse(
        JSON.stringify(
          connectorObjects.filter(connector =>
            connector.object_name
              .toUpperCase()
              .includes(searchValue.toUpperCase())
          )
        )
      );
      result = result.map(item => {
        item.opened = true;
        return item;
      });
      setSelectedSchemes(result);
    } else if (event.key === 'Enter') {
      setSelectedSchemes([]);
    }
  };

  const searchObject = event => {
    if (event.key === 'Enter' && searchValue.length) {
      const result = JSON.parse(
        JSON.stringify(
          objectsLayers.filter(object =>
            object.name.toUpperCase().includes(searchValue.toUpperCase())
          )
        )
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
          tab={isActive => tab(isActive, 'Таблицы', 'дизайнер схемы данных')}
          idx="1"
        >
          <TablesPane onSelect={onSelect} />
        </TabPane>
        <TabPane
          tab={active => tab(active, 'Объекты', 'дизайнер семантического слоя')}
          idx="2"
        >
          <ObjectsPane />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Sidebar;
