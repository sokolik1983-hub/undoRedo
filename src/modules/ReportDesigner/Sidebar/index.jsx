/* eslint-disable react/prop-types */
// import { useState } from 'react';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import DragNDropProvider from '../../QueryPanel/context/DragNDropContext';
import ObjectsPanel from '../../QueryPanel/ObjectsPanel';
import SidePanel from '../../../common/components/SidePanel';
import styles from './Sidebar.module.scss';
import { SIDE_PANEL_TYPES } from '../../../common/constants/common';
import { getSymanticLayerData } from '../../../data/actions/universes';

const Sidebar = ({ semanticLayer, handleShowSelector }) => {
  const dispatch = useDispatch();
  const reportDesigner = useSelector(state => state.app.reportDesigner);
  const isShowingPanel = reportDesigner.reportsUi.ui.showConfigPanel;

  useEffect(() => {
    if (semanticLayer) dispatch(getSymanticLayerData(semanticLayer.id));
  }, [semanticLayer]);

  return (
    <div className={styles.root}>
      <div className={styles.objects}>
        <DragNDropProvider>
          <ObjectsPanel
            symanticLayer={semanticLayer}
            onToggleClick={handleShowSelector}
            showHeader={false}
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
  );
};

export default Sidebar;
