/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import ObjectsPanelHeader from './ObjectsPanelHeader/ObjectsPanelHeader';
import Divider from '../../../common/components/Divider';
import usePanelListFilters from './usePanelListFilters';
import ObjectsPanelFilters from './ObjectsPanelFilters/ObjectsPanelFilters';
import ReportObjectsPanel from './ReportObjectsPanel/index';
import ObjectsPanelList from './ObjectsPanelList/ObjectsPanelList';

import Structure from './ReportObjectsPanel/Structure';
import { useDragNDrop } from '../context/DragNDropContext';
import styles from './ObjectsPanel.module.scss';
import {getCurrentReport} from '../../ReportDesigner/helpers';
import { setMenuItem, setMenu } from '../../../data/reducers/new_reportDesigner';

const ObjectsPanel = ({ modalOpenHandler, showHeader, report, onSelect, isActiveNode }) => {
  const currentLayer = useSelector(state => {
    const {
      data,
      currentLayerTitle
    } = state.app?.data?.queryPanelSymlayersData;

    return data.find(i => i.queryTitle === currentLayerTitle);
  });

  // const symLayersData = useSelector(state => state.app?.data?.symLayersData);

  const rootClasses = clsx(
    styles.root,
    { [styles.report]: report }
  );

  const reportDesigner = useSelector(state => state.app.reportDesigner);
  const currentReport = getCurrentReport(
    reportDesigner.reportsData.present.reports,
    reportDesigner.reportsData.present.activeReport
  );

  const {variables} = currentReport
  const {
    rootFolder,
    filterTypeId,
    handleFiltersSwitch,
    searchValue,
    setSearchValue
  // } = usePanelListFilters(symLayersData?.data?.structure[0]);
  } = usePanelListFilters(currentLayer?.symLayerData);
  const { handleDragOver, handleTreeDrop } = useDragNDrop();

  // const [arr, setArr] = useState(REPORT_OBJECTS_PANEL_ICONS);
  const [showInput, setShowInput] = useState(false);
  
  const dispatch = useDispatch();
  const menuItem = useSelector(
    state => state.app.reportDesigner.reportsUi.ui?.menuItem
  );

  const menu = useSelector(
    state => state.app.reportDesigner.reportsUi.ui?.menu
  );


  // useEffect(() =>{
  //   dispatch(setMenu(REPORT_OBJECTS_PANEL_ICONS));
  // }, []);
  

  const handleToggleIcon = (item) => {
    const newArr = menu.map(el => el.action === item ? 
      {...el, enable: true } : {...el, enable: false });
    dispatch(setMenu(newArr)); 
  };

  const actions = {
    objects: () => { dispatch(setMenuItem('objects')); handleToggleIcon('objects') },
    structure: () => { dispatch(setMenuItem('structure')); handleToggleIcon('structure') },
    map: () => { dispatch(setMenuItem('map')); handleToggleIcon('map') },
    comments: () => { dispatch(setMenuItem('comments')); handleToggleIcon('comments') },
    properties: () => { dispatch(setMenuItem('properties')); handleToggleIcon('properties') },
    magnifier: () => setShowInput(!showInput)
  };

  const handleSetInput = () => {
    setShowInput(!showInput)
  };

  return (
    <div className={rootClasses}>
      {showHeader && (
        <>
          <ObjectsPanelHeader modalOpenHandler={modalOpenHandler} />
          <Divider color="#0D6CDD" />
        </>
      )}
      {report ? (
        <ReportObjectsPanel
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          showInput={showInput}
          setInput={handleSetInput}
          array={menu}
          actions={actions}
        />
      ) : (
        <ObjectsPanelFilters
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          filterId={filterTypeId}
          onFiltersSwitch={handleFiltersSwitch}
        />
      )}
      <div
        className={styles.panelListContainer}
        onDragOver={handleDragOver}
        onDrop={handleTreeDrop}
      >
        {rootFolder && <ObjectsPanelList rootFolder={rootFolder} />}
        {report ? menuItem === 'objects' && (
          <ObjectsPanelList variables={variables} />
        ) : (<ObjectsPanelList variables={variables}  />)}
        {report ? menuItem ==='structure' && (
          <Structure
            onSelect={onSelect}
            currentReport={currentReport}
            isActiveNode={isActiveNode}
          />
        ) : (<></>)}
      </div>
    </div>
  );
};

export default ObjectsPanel;

ObjectsPanel.propTypes = {
  modalOpenHandler: PropTypes.func,
  showHeader: PropTypes.bool,
  onSelect: PropTypes.func,
  isActiveNode: PropTypes.func,
  report: PropTypes.bool
};
