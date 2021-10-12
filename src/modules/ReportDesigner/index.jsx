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
  shapeObject,
  tableObject,
  textObject
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
  text: textObject,
  shape: shapeObject
};

function ReportDesigner() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const dispatch = useDispatch();
  const reportDesigner = useSelector(state => state.app.reportDesigner);
  const currentReport = getCurrentReport(
    reportDesigner.reportsData.present.reports,
    reportDesigner.reportsData.present.activeReport
  );

  useEffect(() => {
    dispatch(setCurrentPage(REPORT_DESIGNER_PAGE));
  }, []);

  function handleMouseMove(event) {
    setMousePosition({
      x: event.nativeEvent.offsetX,
      y: event.nativeEvent.offsetY
    });
  }

  function handleAddBlock(event) {
    event.stopPropagation();
    if (reportDesigner.reportsUi.ui.creatingElement) {
      const newStructure = [
        ...currentReport.structure,
        {
          ...BLOCK_TYPES[reportDesigner.reportsUi.ui.creatingElement],
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
      ...reportDesigner.reportsData.present.reports,
      {
        ...reportObject,
        id: reportDesigner.reportsData.present.reports.length + 1,
        name: `Report ${reportDesigner.reportsData.present.reports.length + 1}`
      }
    ];
    dispatch(
      setReports({
        reports: newReports,
        activeReport: reportDesigner.reportsData.present.reports.length + 1
      })
    );
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
    if (
      lodash.find(reportDesigner.reportsData.present.activeNodes, structureItem)
    ) {
      const filteredNodes = reportDesigner.reportsData.present.activeNodes.filter(
        item => item.id !== structureItem.id
      );
      dispatch(setActiveNodes(filteredNodes));
    } else {
      let newActiveNodes = [structureItem];
      if (addItem) {
        newActiveNodes = [
          ...reportDesigner.reportsData.present.activeNodes,
          structureItem
        ];
      }
      dispatch(setActiveNodes(newActiveNodes));
    }
  };

  function checkIsActiveNode(id) {
    return !lodash.isEmpty(
      lodash.find(
        reportDesigner.reportsData.present.activeNodes,
        item => item.id === id
      )
    );
  }

  function handleDisableSelection() {
    if (reportDesigner.reportsData.present.activeNodes.length > 0) {
      dispatch(setActiveNodes([]));
    }
  }

  return (
    <div className={styles.root}>
      <div className={styles.tabs}>
        {reportDesigner.reportsData.present.reports &&
          reportDesigner.reportsData.present.reports.map((report, idx) => (
            <div
              key={report.id}
              className={clsx(styles.tab, {
                [styles.tab_active]:
                  reportDesigner.reportsData.present.activeReport === report.id
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
        onDoubleClick={handleDisableSelection}
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
              isActiveNode={checkIsActiveNode(block.id)}
            />
          ))}
      </div>

      {reportDesigner.reportsUi.ui.showConfigPanel && (
        <SidePanel
          marginRight={reportDesigner.reportsUi.ui.showReportPanel ? 220 : 0}
        />
      )}
      {reportDesigner.reportsUi.ui.showReportPanel && <SidePanel />}
    </div>
  );
}

export default ReportDesigner;
