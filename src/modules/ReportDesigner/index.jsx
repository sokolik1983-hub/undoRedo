/* eslint-disable no-unused-vars */
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import lodash from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import {
  graphObject,
  reportObject,
  setActiveNodes,
  setActiveReport,
  setConfigPanelVisible,
  setCreatingElement,
  setReports,
  setSelectedColumns,
  setStructure,
  shapeObject,
  tableObject,
  textObject
} from '../../data/reducers/reportDesigner';
import Block from './Block';
import styles from './ReportDesigner.module.scss';
import { generateId, getCurrentReport } from './helpers';
// import SidePanel from '../../common/components/SidePanel';
import { setCurrentPage } from '../../data/reducers/ui';
import { PAGE } from '../../common/constants/pages';
import {
  getStreamReceiever,
  getReportStructure
} from '../../data/actions/newReportDesigner';
// import { SIDE_PANEL_TYPES } from '../../common/constants/common';
import FormulaEditor from '../../common/components/FormulaEditor';
// import Sidebar from '../SymlayersDesigner/Sidebar';
// import ObjectsPanel from '../QueryPanel/ObjectsPanel';
// import DragNDropProvider from '../QueryPanel/context/DragNDropContext';
// import { getSymanticLayerData } from '../../data/actions/universes';
import { ReactComponent as CloseIcon } from '../../layout/assets/close.svg';
import ReportSidebar from './ReportSidebar';
import QueryPanel from '../QueryPanel';
import ReportContent from './ReportContent';
import {
  cellObject,
  reportPageObject,
  setReportDisplayMode
} from '../../data/reducers/new_reportDesigner';

const BLOCK_TYPES = {
  table_vertical: tableObject,
  table_cross: tableObject,
  table_horizontal: tableObject,
  graph: graphObject,
  cell: cellObject,
  shape: shapeObject
};

// const getVariant = (type, tableType, graphType) => {
//   const types = ['table', 'graph'];

//   if (types.includes(type)) {
//     return type === 'table' ? tableType : graphType;
//   }

//   return type;
// };

function ReportDesigner() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [semanticLayer, setSemanticLayer] = useState({
    id: 165,
    name: 'Клиентская справка'
  });

  const dispatch = useDispatch();
  const reportDesigner = useSelector(state => state.app.reportDesigner);
  const { creatingElement } = reportDesigner.reportsUi.ui;
  const currentReport = getCurrentReport(
    reportDesigner.reportsData.present.reports,
    reportDesigner.reportsData.present.activeReport
  );
  const isQueryPanelModalOpened = useSelector(
    state => state.app.ui.modalVisible
  );
  const zoom = useSelector(
    state => state.app.reportDesigner.reportsUi.ui?.zoom
  );

  function handleKeyUp(event) {
    // event.stopPropagation();
    if (event.keyCode === 46 || event.keyCode === 8) {
      if (reportDesigner.reportsData.present.activeNodes.length > 0) {
        const activeNodeIds = reportDesigner.reportsData.present.activeNodes.map(
          item => item.id
        );
        const filteredStructure = currentReport.structure?.filter(
          item => !activeNodeIds.includes(item.id)
        );
        dispatch(setStructure(filteredStructure));
        dispatch(setActiveNodes([]));
      }
    }
  }

  useEffect(async () => {
   dispatch(setCurrentPage(PAGE.REPORT_DESIGNER));
  

    document.body.addEventListener('keyup', handleKeyUp);
  }, []);

  useEffect(async () => {
    dispatch(getStreamReceiever({ fileName: 'test.js' }));
  }, []);

  useEffect(async () => {
     dispatch(getReportStructure({"report_id": "R1"}));
   }, []);

   useEffect(async () => {
    dispatch(setCurrentPage(PAGE.REPORT_DESIGNER));
    //  dispatch(getReportStructure({ fileName: 'test.js' }));
 
     document.body.addEventListener('keyup', handleKeyUp);
   }, []);

  useEffect(() => {
    return () => {
      document.body.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  function handleMouseMove(event) {
    setMousePosition({
      x: event.nativeEvent.offsetX,
      y: event.nativeEvent.offsetY
    });
  }

  function handleAddBlock(event) {
    event.stopPropagation();
    // TODO change to new store
    // if (reportDesigner.reportsUi.ui.creatingElement) {
    //   const newStructure = [
    //     ...currentReport.structure,
    //     {
    //       ...BLOCK_TYPES[reportDesigner.reportsUi.ui.creatingElement],
    //       position: mousePosition,
    //       id: generateId(),
    //       variant: creatingElement
    //     }
    //   ];

    //   dispatch(setCreatingElement(null));
    //   dispatch(setStructure(newStructure));
    // }
  }

  // function handleChangePosition(id, newPosition) {
  //   const newStructure = lodash.cloneDeep(currentReport.structure);
  //   const currentBlock = lodash.find(newStructure, item => item.id === id);

  //   if (currentBlock) {
  //     currentBlock.position = { ...newPosition };
  //   }

  //   dispatch(setStructure(newStructure));
  // }
  // function handleChangeScales(id, newScales) {
  //   const newStructure = lodash.cloneDeep(currentReport.structure);
  //   const currentBlock = lodash.find(newStructure, item => item.id === id);
  //   if (currentBlock) {
  //     currentBlock.scales = {
  //       width: newScales.width,
  //       height: newScales.height
  //     };
  //     currentBlock.position = { x: newScales.x, y: newScales.y };
  //   }

  //   dispatch(setStructure(newStructure));
  // }

  function handleChangeMode() {
    const { displayMode } = currentReport;
    let newMode = '';

    if (displayMode && displayMode === 'Data') {
      newMode = 'Formula';
    } else {
      newMode = 'Data';
    }

    dispatch(setReportDisplayMode(newMode));
  }

  function handleAddReport() {
    const newReports = [
      ...reportDesigner.reportsData.present.reports,
      {
        ...reportPageObject,
        id: reportDesigner.reportsData.present.reports.length + 1,
        name: `Отчет ${reportDesigner.reportsData.present.reports.length + 1}`
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
    const reportIdx = lodash.findIndex(
      reportDesigner.reportsData.present.reports,
      item => item.id === reportId
    );
    if (reportDesigner.reportsData.present.reports?.length > 1) {
      const newReports = reportDesigner.reportsData.present.reports.filter(
        report => report.id !== reportId
      );
      if (reportDesigner.reportsData.present.activeReport === reportId) {
        dispatch(
          setActiveReport(
            reportDesigner.reportsData.present.reports[reportIdx - 1]?.id
          )
        );
      }
      dispatch(setReports({ reports: newReports }));
    }
  };

  // const handleSelect = (structureItem, addItem) => {
  //   if (
  //     lodash.find(reportDesigner.reportsData.present.activeNodes, structureItem)
  //   ) {
  //     const filteredNodes = reportDesigner.reportsData.present.activeNodes.filter(
  //       item => item.id !== structureItem.id
  //     );
  //     dispatch(setActiveNodes(filteredNodes));
  //     dispatch(setConfigPanelVisible(false));
  //   } else {
  //     let newActiveNodes = [structureItem];
  //     if (addItem) {
  //       newActiveNodes = [
  //         ...reportDesigner.reportsData.present.activeNodes,
  //         structureItem
  //       ];
  //     }
  //     dispatch(setActiveNodes(newActiveNodes));
  //     dispatch(setConfigPanelVisible(true));
  //   }
  // };

  // function checkIsActiveNode(id) {
  //   return !lodash.isEmpty(
  //     lodash.find(
  //       reportDesigner.reportsData.present.activeNodes,
  //       item => item.id === id
  //     )
  //   );
  // }

  function handleDisableSelection() {
    if (reportDesigner.reportsData.present.activeNodes.length > 0) {
      dispatch(setActiveNodes([]));
      dispatch(setSelectedColumns());
      dispatch(setConfigPanelVisible(false));
    }
  }

  const handleShowSelector = () => {
    setSemanticLayer(true);
  };

  // useEffect(() => {
  //   if (semanticLayer) dispatch(getSymanticLayerData(semanticLayer.id));
  // }, [semanticLayer]);
  // {id: 165, name: "Клиентская справка"}

  return (
    <div className={styles.root}>
      {/* <div className={styles.sidebar}>
        <DragNDropProvider>
          <ObjectsPanel
            symanticLayer={semanticLayer}
            onToggleClick={handleShowSelector}
            showHeader={false}
          />
        </DragNDropProvider>
      </div> */}
      <ReportSidebar
        semanticLayer={semanticLayer}
        onToggleClick={handleShowSelector}
        showHeader={false}
      />
      <div className={styles.content}>
        {reportDesigner.reportsUi.ui.showFormulaEditor && (
          <div className={styles.formulaEditor}>
            <FormulaEditor />
          </div>
        )}
        <div className={styles.tabs}>
          {reportDesigner.reportsData.present.reports &&
            reportDesigner.reportsData.present.reports.map(report => {
              const isActive =
                reportDesigner.reportsData.present.activeReport === report.id;
              return (
                <div
                  key={report.id}
                  className={clsx(styles.tab, {
                    [styles.tab_active]: isActive
                  })}
                  onClick={handleSelectReport(report.id)}
                >
                  {report.name}
                  {isActive && (
                    <CloseIcon
                      onClick={handleDeleteReport(report.id)}
                      className={styles.closeIcon}
                    />
                  )}
                </div>
              );
            })}
          <button onClick={handleAddReport} type="button">
            +
          </button>
          <button onClick={handleChangeMode} type="button">
            *
          </button>
        </div>
        <div className={styles.containerOutline}>
          <div
            style={{ zoom: `${zoom}` }}
            className={clsx(styles.container, styles['container-portrait'])}
            onMouseMove={handleMouseMove}
            onClick={handleAddBlock}
            onDoubleClick={handleDisableSelection}
          >
            <ReportContent structure={currentReport?.structure} />
            {/* <ReportHeader data={currentReport?.structure?.pgHeader} />
            <ReportBody data={currentReport?.structure?.pgBody} />
            {currentReport?.structure?.map(block => (
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
            <ReportFooter data={currentReport?.structure?.pgFooter} /> */}
          </div>
        </div>
      </div>
      {isQueryPanelModalOpened && (
        <QueryPanel visible={isQueryPanelModalOpened && true} />
      )}
      {/* <div className="right">
        {reportDesigner.reportsUi.ui.showConfigPanel && (
          <SidePanel
            navType={SIDE_PANEL_TYPES.BLOCK_MENU}
            marginRight={reportDesigner.reportsUi.ui.showReportPanel ? 250 : 0}
          />
        )}
        {reportDesigner.reportsUi.ui.showReportPanel && (
          <SidePanel navType={SIDE_PANEL_TYPES.CONFIG_MENU} />
        )}
      </div> */}
    </div>
  );
}

export default ReportDesigner;
