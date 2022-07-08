import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import ReportObjectsPanelIcons from './ReportObjectsPanelList/ReportObjectsPanelIcons';
import ReportObjectsPanelList from './ReportObjectsPanelList/index';
import { REPORT_OBJECTS_PANEL_ICONS } from '../../../common/constants/reportDesigner/reportObjectsPanelIcons';
import Structure from './ReportObjectsPanelList/Structure';
import styles from './ReportObjectsPanel.module.scss';
import {getCurrentReport} from '../helpers';
import { setMenuItem } from '../../../data/reducers/new_reportDesigner';

const ReportObjectsPanel = ({ onSelect, isActiveNode }) => {

  const reportDesigner = useSelector(state => state.app.reportDesigner);
  const currentReport = getCurrentReport(
    reportDesigner.reportsData.present.reports,
    reportDesigner.reportsData.present.activeReport
  );

  const {variables} = currentReport;

  const [iconsArr, setIconsArr] = useState(REPORT_OBJECTS_PANEL_ICONS);
  const [showInput, setShowInput] = useState(false);
  
  const dispatch = useDispatch();
  const menuItem = useSelector(
    state => state.app.reportDesigner.reportsUi.ui?.menuItem
  );

  const handleToggleIcon = (item) => {
    const newArr = iconsArr.map(el => el.action === item ? 
      {...el, enable: true } : {...el, enable: false });
    setIconsArr(newArr); 
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
    <div className={styles.report}>
      <ReportObjectsPanelIcons
        showInput={showInput}
        setInput={handleSetInput}
        iconsArr={iconsArr}
        menuItem={menuItem}
        actions={actions}
      />
      <div
        className={styles.panelListContainer}
      >
        {menuItem === 'objects' && (<ReportObjectsPanelList variables={variables} />)}
        {menuItem ==='structure' && (
          <Structure
            onSelect={onSelect}
            currentReport={currentReport}
            isActiveNode={isActiveNode}
          />
        )}
      </div>
    </div>
  );
};

export default ReportObjectsPanel;

ReportObjectsPanel.propTypes = {
  onSelect: PropTypes.func,
  isActiveNode: PropTypes.func
};
