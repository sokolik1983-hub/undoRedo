/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import DragNDropProvider from '../../QueryPanel/context/DragNDropContext';
import ObjectsPanel from '../../QueryPanel/ObjectsPanel';
import SidePanel from '../../../common/components/SidePanel';
import styles from './ReportSidebar.module.scss';
import { SIDE_PANEL_TYPES } from '../../../common/constants/common';
import { getSymanticLayerData } from '../../../data/actions/universes';
import { ReactComponent as Arrow } from '../../../layout/assets/semanticLayerModal/arrow.svg';
import ReportInfoBlock from '../ReportInfoBlock';

const items = [
  {
    id: 1,
    name: 'Объекты'
  },
  {
    id: 2,
    name: 'Структура'
  },
  {
    id: 3,
    name: 'Карта'
  },
  {
    id: 4,
    name: 'Комментарии'
  },
  {
    id: 5,
    name: 'Свойства'
  },
  {
    id: 6,
    name: 'Навигация'
  }
];

const ReportSidebar = ({ semanticLayer, handleShowSelector }) => {
  const dispatch = useDispatch();
  const reportDesigner = useSelector(state => state.app.reportDesigner);
  const isShowingPanel = reportDesigner.reportsUi.ui.showConfigPanel;

  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleSelectTab = value => () => {
    setActiveTab(value);
  };

  const handleChangeEditBlockClass = () => {
    if (activeTab === 0 && collapsed) {
      return styles.editBlockCollapsed
    }
    if (activeTab === 0) {
      return styles.editBlock
    } 
    if (collapsed) {
      return styles.editBlockActiveCollapsed
    } 
    return styles.editBlockActive
  };

  const handleChangeViewBlockClass = () => {
    if (activeTab === 1) {
      return styles.viewBlock
    }
    if (collapsed) {
      return styles.viewBlockActiveCollapsed
    }
    return styles.viewBlockActive
  };

  useEffect(() => {
    if (semanticLayer) dispatch(getSymanticLayerData(semanticLayer.id));
  }, [semanticLayer]);

  return (
    <>
      <div className={styles.root}>
        <div className={styles.tabs}>
          <div
            className={handleChangeViewBlockClass()}
            onClick={handleSelectTab(0)}
          >
            {activeTab === 1 ? <p className={styles.viewText}>Режим просмотра</p> :
            (
              <>
                <div>
                  <p className={styles.viewActiveText}>просмотр</p>
                  <p className={styles.viewItem}>{items[5].name}</p>
                </div>
                <div className={styles.actions}>
                  <div onClick={handleCollapse}>
                    <Arrow stroke='white' fill='none' className={clsx(styles.arrow, collapsed ? '' : styles.rotate)} />
                  </div>
                </div>
              </>
            )}
          </div>
          <div
            className={handleChangeEditBlockClass()}
            onClick={handleSelectTab(1)}
          >
            {activeTab === 0 ? <p className={styles.editText}>Режим редактирования</p> :
            (
              <>
                <div>
                  <p className={styles.editActiveText}>редактирование</p>
                  <p className={styles.editableItem}>{items[2].name}</p>
                </div>
                <div className={styles.actions}>
                  <div onClick={handleCollapse}>
                    <Arrow stroke='black' fill='none' className={clsx(styles.arrow, collapsed ? '' : styles.rotate)} />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        {!collapsed && (
        <div
          className={styles.content}
          style={{background: activeTab === 0 ?
         'linear-gradient(163.79deg, rgba(0, 55, 137, 0.75) 6.45%, rgba(0, 55, 137, 0.375) 100%)' : 'white'}}
        >
          {activeTab === 1 ? (
            <>
              <div className={styles.contentData}>
                <div className={styles.objects}>
                  <DragNDropProvider>
                    <ObjectsPanel
                      symanticLayer={semanticLayer}
                      onToggleClick={handleShowSelector}
                      showHeader={false}
                      report
                    />
                  </DragNDropProvider>
                </div>
                <div
                  className={clsx(styles.sidePanel, {
                    [styles.sidePanelVisible]: isShowingPanel
                  })}
                >
                  <SidePanel
                    navType={SIDE_PANEL_TYPES.BLOCK_MENU}
                    marginRight={reportDesigner.reportsUi.ui.showReportPanel ? 250 : 0}
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
