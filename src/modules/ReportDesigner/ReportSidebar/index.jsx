/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import clsx from 'clsx';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SidePanel from '../../../common/components/SidePanel';
import { SIDE_PANEL_TYPES } from '../../../common/constants/common';
import { REPORT_OBJECTS_PANEL_ICONS } from '../../../common/constants/reportDesigner/reportObjectsPanelIcons';
import { setStructureBeforeGetData } from '../../../data/reportDesigner/reportsData/reportsDataActions';
import { setReportDisplayMode } from '../../../data/reportDesigner/reportsData/reportsDataReducer';
// import { getSymanticLayerData } from '../../../data/actions/universes';
import Arrow from '../../../layout/assets/semanticLayerModal/arrow.svg';
import DragNDropProvider from '../../QueryPanel/context/DragNDropContext';
import ReportInfoBlock from '../ReportInfoBlock';
import ReportObjectsPanel from '../ReportObjectsPanel/index';
import styles from './ReportSidebar.module.scss';

const ReportSidebar = ({
  semanticLayer,
  handleShowSelector,
  onSelect,
  setTabNumber,
  isActiveNode,
  currentReport,
}) => {
  const reportDesigner = useSelector((state) => state.app.reportDesigner);
  const isShowingPanel = reportDesigner.reportsUi.ui.showConfigPanel;

  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState(1);

  const dispatch = useDispatch();

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  // const { displayMode } = currentReport;
  console.log('the end', currentReport);

  const handleChangeMode = (num) => {
    let newMode = '';

    // if (displayMode && displayMode === 'Data' && num === 1) {
    //   newMode = 'Structure';
    // }
    // if (num === 0) {
    //   newMode = 'Data';
    // }

    // if (newMode === 'Data') {
    //   dispatch(
    //     setStructureBeforeGetData({
    //       structure: {
    //         report_id: currentReport.id,
    //         structure: currentReport.structure,
    //       },
    //       mode: 'Data',
    //     }),
    //   );
    // } else {
    dispatch(setReportDisplayMode(newMode));
    // }
  };

  const handleChangeEditBlockClass = () => {
    if (activeTab === 0 && collapsed) {
      return styles.editBlockCollapsed;
    }
    if (activeTab === 0) {
      return styles.editBlock;
    }
    if (collapsed) {
      return styles.editBlockActiveCollapsed;
    }
    return styles.editBlockActive;
  };

  const handleChangeViewBlockClass = () => {
    if (activeTab === 1) {
      return styles.viewBlock;
    }
    if (collapsed) {
      return styles.viewBlockActiveCollapsed;
    }
    return styles.viewBlockActive;
  };

  const menuItem = useSelector(
    (state) => state.app.reportDesigner.reportsUi.ui?.menuItem,
  );

  const getName = (item) => {
    const res = REPORT_OBJECTS_PANEL_ICONS.filter((el) => el.action === item);
    return res[0].title;
  };

  // useEffect(() => {
  //   if (semanticLayer) dispatch(getSymanticLayerData(semanticLayer.id));
  // }, [semanticLayer]);

  const sidePanelStyle = clsx(styles.sidePanel, {
    [styles.sidePanelVisible]: isShowingPanel,
  });

  return (
    <>
      <div className={styles.root}>
        <div className={styles.tabs}>
          <div
            className={handleChangeViewBlockClass()}
            onClick={() => {
              setActiveTab(0);
              setTabNumber(0);
              handleChangeMode(0);
            }}
          >
            {activeTab === 1 ? (
              <p className={styles.viewText}>Режим просмотра</p>
            ) : (
              <>
                <div>
                  <p className={styles.viewActiveText}>просмотр</p>
                  {/* <p className={styles.viewItem}>{getName(menuItem)}</p> */}
                  <p className={styles.viewItem}>Структура</p>
                </div>
                <div className={styles.actions}>
                  <div onClick={handleCollapse}>
                    <Arrow
                      stroke="white"
                      fill="none"
                      className={clsx(
                        styles.arrow,
                        collapsed ? '' : styles.rotate,
                      )}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
          <div
            className={handleChangeEditBlockClass()}
            onClick={() => {
              setActiveTab(1);
              setTabNumber(1);
              handleChangeMode(1);
            }}
          >
            {activeTab === 0 ? (
              <p className={styles.editText}>Режим редактирования</p>
            ) : (
              <>
                <div>
                  <p className={styles.editActiveText}>редактирование</p>
                  <p className={styles.editableItem}>{getName(menuItem)}</p>
                </div>
                <div className={styles.actions}>
                  <div onClick={handleCollapse}>
                    <Arrow
                      stroke="black"
                      fill="none"
                      className={clsx(
                        styles.arrow,
                        collapsed ? '' : styles.rotate,
                      )}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        {!collapsed && (
          <div
            className={styles.content}
            style={{
              background:
                activeTab === 0
                  ? 'linear-gradient(163.79deg, rgba(0, 55, 137, 0.75) 6.45%, rgba(0, 55, 137, 0.375) 100%)'
                  : 'white',
            }}
          >
            {activeTab === 1 ? (
              <>
                <div className={styles.contentData}>
                  <div className={styles.objects}>
                    <DragNDropProvider>
                      <ReportObjectsPanel
                        symanticLayer={semanticLayer}
                        onToggleClick={handleShowSelector}
                        onSelect={onSelect}
                        isActiveNode={isActiveNode}
                        showHeader={false}
                      />
                    </DragNDropProvider>
                  </div>
                  <div className={sidePanelStyle}>
                    <SidePanel
                      navType={SIDE_PANEL_TYPES.BLOCK_MENU}
                      marginRight={isShowingPanel ? 250 : 0}
                    />
                  </div>
                </div>
              </>
            ) : (
              <ReportInfoBlock />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ReportSidebar;
