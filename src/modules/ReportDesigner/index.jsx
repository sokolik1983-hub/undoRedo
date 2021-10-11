import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import lodash from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import {
  graphObject,
  reportObject,
  setActiveNodes,
  setActiveReport,
  setCreatingElement,
  setReports,
  setStructure,
  tableObject
} from '../../data/reducers/reportDesigner';
import Block from './Block';
import styles from './ReportDesigner.module.scss';
import { getCurrentReport } from './helpers';
import SidePanel from '../../common/components/SidePanel';
import { setCurrentPage } from '../../data/reducers/ui';
import { REPORT_DESIGNER_PAGE } from '../../common/constants/pages';

const BLOCK_TYPES = {
  table: tableObject,
  graph: graphObject,
  text: {},
  shape: {}
};

function ReportDesigner() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const dispatch = useDispatch();
  const reportDesigner = useSelector(state => state.app.reportDesigner);
  const currentReport = getCurrentReport(
    reportDesigner.reports,
    reportDesigner.activeReport
  );

  useEffect(() => {
    dispatch(setCurrentPage(REPORT_DESIGNER_PAGE));
  });

  function handleMouseMove(event) {
    setMousePosition({
      x: event.nativeEvent.offsetX,
      y: event.nativeEvent.offsetY
    });
  }

  function handleAddBlock(event) {
    event.stopPropagation();
    if (reportDesigner.ui.creatingElement) {
      const newStructure = [
        ...currentReport.structure,
        {
          ...BLOCK_TYPES[reportDesigner.ui.creatingElement],
          position: mousePosition,
          id: currentReport.structure.length + 1
        }
      ];

      dispatch(setCreatingElement(null));
      dispatch(setStructure(newStructure));
    }
  }

  function handleChangePosition(id, newPosition) {
    const newStructure = lodash.cloneDeep(currentReport.structure);
    const currentBlock = lodash.find(newStructure, item => item.id === id);

    if (currentBlock) {
      currentBlock.position = { ...newPosition };
    }

    dispatch(setStructure(newStructure));
  }
  function handleChangeScales(id, newScales) {
    const newStructure = lodash.cloneDeep(currentReport.structure);
    const currentBlock = lodash.find(newStructure, item => item.id === id);
    if (currentBlock) {
      currentBlock.scales = {
        width: newScales.width,
        height: newScales.height
      };
      currentBlock.position = { x: newScales.x, y: newScales.y };
    }

    dispatch(setStructure(newStructure));
  }

  function handleAddReport() {
    const newReports = [
      ...reportDesigner.reports,
      {
        ...reportObject,
        id: reportDesigner.reports.length + 1,
        name: `Report ${reportDesigner.reports.length + 1}`
      }
    ];
    dispatch(setReports(newReports));
    dispatch(setActiveReport(reportDesigner.reports.length + 1));
  }
  const handleSelectReport = reportId => event => {
    event.stopPropagation();
    dispatch(setActiveReport(reportId));
  };
  const handleDeleteReport = reportId => event => {
    event.stopPropagation();
    if (reportDesigner.reports?.length > 1) {
      const newReports = reportDesigner.reports.filter(
        report => report.id !== reportId
      );
      if (reportDesigner.activeReport === reportId) {
        dispatch(setActiveReport(reportDesigner.reports[0]?.id));
      }
      dispatch(setReports(newReports));
    }
  };

  const handleSelect = (structureItem, addItem) => {
    let newActiveNodes = [structureItem];
    if (addItem) {
      newActiveNodes = [...reportDesigner.activeNodes, structureItem];
    }
    dispatch(setActiveNodes(newActiveNodes));
  };

  return (
    <div className={styles.root}>
      <div className={styles.tabs}>
        {reportDesigner.reports &&
          reportDesigner.reports.map((report, idx) => (
            <div
              key={report.id}
              className={clsx(styles.tab, {
                [styles.tab_active]: reportDesigner.activeReport === report.id
              })}
              onClick={handleSelectReport(report.id)}
            >
              {report.name}
              {idx > 0 && (
                <span
                  style={{ marginLeft: 10 }}
                  onClick={handleDeleteReport(report.id)}
                >
                  x
                </span>
              )}
            </div>
          ))}
        <button onClick={handleAddReport} type="button">
          +
        </button>
      </div>
      <div
        className={styles.container}
        onMouseMove={handleMouseMove}
        onClick={handleAddBlock}
      >
        {currentReport &&
          currentReport.structure?.map(block => (
            <Block
              {...block}
              key={block.id}
              structureItem={block}
              onChangePosition={handleChangePosition}
              onChangeScales={handleChangeScales}
              onSelect={handleSelect}
            />
          ))}
      </div>

      {reportDesigner.ui.showConfigPanel && (
        <SidePanel marginRight={reportDesigner.ui.showReportPanel ? 220 : 0} />
      )}
      {reportDesigner.ui.showReportPanel && <SidePanel />}
    </div>
  );
}

export default ReportDesigner;
