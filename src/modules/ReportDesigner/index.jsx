/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import lodash from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '../../common/components/IconButton';
import {
  reportObject,
  setActiveNodes,
  setActiveReport,
  setConfigPanelVisible,
  setCreatingElement,
  setReports,
  setSelectedColumns,
  setStructure,
  cellObject,
  reportPageObject,
  setFormattingElementFormula,
  setActiveNodeFormula
} from '../../data/reducers/new_reportDesigner';
import { BUTTON } from '../../common/constants/common';
import Button from '../../common/components/Button';
import styles from './ReportDesigner.module.scss';
import { createReportElement, generateId, getCurrentReport } from './helpers';
import PagesNav from '../../layout/components/NewReportActions/PagesNav/index';
import { setCurrentPage } from '../../data/reducers/ui';
import { PAGE } from '../../common/constants/pages';
import {
  getStreamReceiever,
  getReportStructure,
  getVariables,
  refreshServerResponse,
  getElementData
} from '../../data/actions/newReportDesigner';
import { REPORT_ACTIONS } from '../../common/constants/reportDesigner/reportActions';
import FormulaEditor from '../../common/components/FormulaEditor';
// import Sidebar from '../SymlayersDesigner/Sidebar';
// import ObjectsPanel from '../QueryPanel/ObjectsPanel';
// import DragNDropProvider from '../QueryPanel/context/DragNDropContext';
// import { getSymanticLayerData } from '../../data/actions/universes';
import ReportSidebar from './ReportSidebar';
import QueryPanel from '../QueryPanel';
import ReportContent from './ReportContent';
import { ReactComponent as MiniFormulaIcon } from '../../layout/assets/reportDesigner/miniFormula.svg';
import { ReactComponent as OkFormulaIcon } from '../../layout/assets/reportDesigner/okFormula.svg';
import { ReactComponent as ClearFormulaIcon } from '../../layout/assets/reportDesigner/clearFormula.svg';
import { ReactComponent as PlusIcon } from '../../layout/assets/queryPanel/plus.svg';
import Tooltip from '../../common/components/Tooltip';
import Dropdown from '../../common/components/Dropdown';
import RenameModal from './ReportModals/RenameModal';
import DeleteModal from './ReportModals/DeleteModal';
import DropdownItem from '../../common/components/Dropdown/DropdownItem';

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
  const [activeTab, setActiveTab] = useState(1);

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
  const [reportName, setNewReportName] = useState('');
  const [isDeleteModalActive, setIsDeleteModalActive] = useState(false);
  const [isRenameModalActive, setIsRenameModalActive] = useState(false);

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

  useEffect(() => {
    dispatch(setCurrentPage(PAGE.REPORT_DESIGNER));

    document.body.addEventListener('keyup', handleKeyUp);
  }, []);

  useEffect(async () => {
    // await dispatch(refreshServerResponse());
    await dispatch(getStreamReceiever({ fileName: 'testX.js' }));
    await dispatch(getReportStructure({ report_id: 'R1' }));
    await dispatch(getVariables());

    // await dispatch(getElementData({ report_id: 'R1', element_id: 'R1.B.2.B' }));
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

    if (reportDesigner.reportsUi.ui.creatingElement) {
      const newStructure = lodash.cloneDeep(currentReport.structure);
      newStructure.pgBody.content.children.push(
        createReportElement({
          type: reportDesigner.reportsUi.ui.creatingElement,
          mousePosition
        })
      );
      // const newStructure = [
      //   ...currentReport.structure,
      //   {
      //     ...BLOCK_TYPES[reportDesigner.reportsUi.ui.creatingElement],
      //     position: mousePosition,
      //     id: generateId(),
      //     variant: creatingElement
      //   }
      // ];

      dispatch(setCreatingElement(null));
      dispatch(setStructure(newStructure));
    }
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

  const isShowingPanel = reportDesigner.reportsUi.ui.showConfigPanel;

  const containerStyle = () => {
    if (reportDesigner.reportsUi?.ui.showFormulaEditor && !isShowingPanel) {
      return styles.container;
    }

    if (
      activeTab === 1 &&
      isShowingPanel &&
      !reportDesigner.reportsUi?.ui.showFormulaEditor
    ) {
      return styles.containerTab1;
    }

    if (
      activeTab === 1 &&
      reportDesigner.reportsUi?.ui.showFormulaEditor &&
      isShowingPanel
    ) {
      return styles.containerTab1Formula;
    }

    return styles.containerFull;
  };

  const footerCompressed = clsx(styles.footer, {
    [styles.footerCompressed]: isShowingPanel
  });

  const formulaCompressed = clsx(styles.formula, {
    [styles.formulaCompressed]: isShowingPanel
  });

  function handleAddReport() {
    const newReports = [
      ...reportDesigner.reportsData.present.reports,
      {
        ...reportPageObject,
        // id: reportDesigner.reportsData.present.reports.length + 1,
        // name: `Отчет ${reportDesigner.reportsData.present.reports.length + 1}`
        id: generateId(),
        name: `Отчет ${generateId()}`
      }
    ];
    dispatch(
      setReports({
        reports: newReports,
        activeReport: reportDesigner.reportsData.present.reports.length + 1
      })
    );
  };

  const handleSelectReport = reportId => event => {
    event.stopPropagation();
    dispatch(setActiveReport(reportId));
  };

    // const handleDeleteReport = reportId => event => {
    // event.stopPropagation();
    // const reportIdx = lodash.findIndex(
    //   reportDesigner.reportsData.present.reports,
    //   item => item.id === reportId
    // );
    // if (reportDesigner.reportsData.present.reports?.length > 1) {
    //   const newReports = reportDesigner.reportsData.present.reports.filter(
    //     report => report.id !== reportId
    //   );
    //   if (reportDesigner.reportsData.present.activeReport === reportId) {
    //     dispatch(
    //       setActiveReport(
    //         reportDesigner.reportsData.present.reports[reportIdx - 1]?.id
    //       )
    //     );
    //   }
    //   dispatch(setReports({ reports: newReports }));

// -------------------начало: действия с отчетом внизу страницы---------------------------------

  const handleRenameReport = (repName) => {
    const editedReport = {...currentReport, name: repName};
    const newReports = lodash.cloneDeep(reportDesigner?.reportsData?.present?.reports);
    const reportIdx = reportDesigner?.reportsData?.present?.reports.indexOf(currentReport);
    newReports.splice(reportIdx, 1, editedReport);
    dispatch(setReports({reports: newReports}));
    setIsRenameModalActive(false);
  };

  const handleCopyReport = () => {
    const copyReport = {...currentReport, name: `${currentReport.name} (копия)`, id: generateId()};
    const newReports = lodash.cloneDeep(reportDesigner?.reportsData?.present?.reports);
    const reportIdx = reportDesigner?.reportsData?.present?.reports.indexOf(currentReport);
    newReports.splice(reportIdx + 1, 0, copyReport);
    dispatch(setActiveReport(reportDesigner.reportsData.present.reports[reportIdx]?.id));
    dispatch(setReports({reports: newReports}));
  };

  const handleDeleteReport = reportId => event => {
    event.stopPropagation();
    const newReports = lodash.cloneDeep(reportDesigner?.reportsData?.present?.reports);
    const reportIdx = reportDesigner?.reportsData?.present?.reports.indexOf(currentReport);
    newReports.splice(reportIdx, 1);
    dispatch(setActiveReport(reportDesigner.reportsData.present.reports[reportIdx - 1]?.id));
    dispatch(setReports({reports: newReports}));
    setIsDeleteModalActive(false);
  };

  const handleClick = (action) => {
    switch (action) {
      case 'rename':
        setIsRenameModalActive(true);
        break;
      case 'copy':
        handleCopyReport();
        break;
      case 'delete':
        setIsDeleteModalActive(true);
        break;
      default:
        console.log(action);
    }
  };

  const menu = () => (
    <div className={styles.itemsWrapper}>
      {REPORT_ACTIONS.map(item => (
        <DropdownItem
          key={item.title}
          className={styles.dropdownItem}
          onClick={action => handleClick(action)}
          item={item}
        />
      ))}
    </div>
  );

// -------------------конец: действия с отчетом внизу страницы---------------------------------

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
      dispatch(setSelectedColumns());
      dispatch(setConfigPanelVisible(false));
    }
  }

  const handleShowSelector = () => {
    setSemanticLayer(true);
  };

  const [formula, setFormula] = useState('');

  const activeNode =
    reportDesigner.reportsData.present.activeNodes &&
    reportDesigner.reportsData.present.activeNodes[0];

  useEffect(() => {
    if (activeNode && activeNode.type === 'cell') {
      setFormula(activeNode?.content?.expression?.formula);
    } else {
      setFormula('');
    }
  }, [activeNode]);

  const handleChange = e => setFormula(e.target.value);

  // useEffect(() => {
  //   if (semanticLayer) dispatch(getSymanticLayerData(semanticLayer.id));
  // }, [semanticLayer]);
  // {id: 165, name: "Клиентская справка"}

  const handleSelectBlock = (structureItem, addItem) => {
    if (
      lodash.find(reportDesigner.reportsData.present.activeNodes, structureItem)
    ) {
      const filteredNodes = reportDesigner.reportsData.present.activeNodes.filter(
        item => item.id !== structureItem.id
      );
      dispatch(setActiveNodes(filteredNodes));
      dispatch(setConfigPanelVisible(false));
    } else {
      let newActiveNodes = [structureItem];
      if (addItem) {
        newActiveNodes = [
          ...reportDesigner.reportsData.present.activeNodes,
          structureItem
        ];
      }
      dispatch(setActiveNodes(newActiveNodes));
      dispatch(setConfigPanelVisible(true));
    }
  };

  return (
    <div className={styles.root}>
      <ReportSidebar
        semanticLayer={semanticLayer}
        onToggleClick={handleShowSelector}
        onSelect={handleSelectBlock}
        isActiveNode={checkIsActiveNode}
        showHeader={false}
        setTabNumber={setActiveTab}
        currentReport={currentReport}
      />
      <div className={styles.wrapper}>
        {reportDesigner.reportsUi.ui.showFormulaEditor && (
          <div className={activeTab === 1 ? formulaCompressed : styles.formula}>
            <MiniFormulaIcon />
            <textarea
              className={styles.formulaTextarea}
              type="text"
              name="formula"
              value={formula}
              onChange={handleChange}
              disabled={!activeNode}
              onKeyUp={ev => {
                if (ev.key === 'Enter') {
                  dispatch(setActiveNodeFormula(ev.target.value));
                  dispatch(setActiveNodes([]));
                  dispatch(setConfigPanelVisible(false));
                }
              }}
            />
            <div className={styles.formulaIcons}>
              <IconButton
                size="small"
                className={styles.okFormula}
                icon={<OkFormulaIcon />}
                onClick={() => {
                  dispatch(setActiveNodeFormula(formula));
                  dispatch(setActiveNodes([]));
                  dispatch(setConfigPanelVisible(false));
                }}
              />
              <IconButton
                size="small"
                icon={<ClearFormulaIcon />}
                onClick={() => {}}
              />
            </div>
          </div>
        )}
        <div className={containerStyle()}>
          <div
            style={{ zoom: `${zoom}` }}
            className={styles.innerContainer}
            onMouseMove={handleMouseMove}
            onClick={handleAddBlock}
            onDoubleClick={handleDisableSelection}
          >
            {currentReport?.structure && (
              <ReportContent
                structure={currentReport?.structure}
                onSelect={handleSelectBlock}
                isActiveNode={checkIsActiveNode}
              />
            )}
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
        <div className={activeTab === 1 ? footerCompressed : styles.footer}>
          <div className={styles.tabs}>
            {reportDesigner.reportsData.present.reports &&
              reportDesigner.reportsData.present.reports.map(report => {
                const isActive =
                  reportDesigner.reportsData.present.activeReport === report.id;
                return (
                  <div>
                    <Dropdown
                      trigger={isActive ? ['contextMenu'] : ''}
                      overlay={menu()}
                    >
                      <Button
                        buttonStyle={BUTTON.BLUE}
                        key={report.id}
                        className={clsx(styles.tab, {[styles.activeTab]: isActive })}
                        onClick={handleSelectReport(report.id)}
                      >
                        {report.name}
                      </Button>
                    </Dropdown>
                    
                    <DeleteModal
                      isOpen={isDeleteModalActive}
                      onConfirm={handleDeleteReport()}
                      onCancel={() => setIsDeleteModalActive(false)}
                    />
                    <RenameModal
                      isOpen={isRenameModalActive}
                      onRename={handleRenameReport}
                      onCancel={() => setIsRenameModalActive(false)}
                      setNewName={setNewReportName}
                      oldName={report.name}
                      name={reportName}
                    />
                  </div>
                );
            })}
            <Tooltip
              placement="topLeft"
              overlay={<div className={styles.tooltip}>Добавить отчет</div>}
              align={{offset: [15, 8]}}
            >
              <IconButton
                className={styles.addBtn}
                onClick={handleAddReport}
                icon={<PlusIcon />}
              />
            </Tooltip>
          </div>
          <div style={{width: '10%', marginLeft: 'auto'}}><PagesNav /></div>
        </div>
      </div>
      {isQueryPanelModalOpened && (
        <QueryPanel visible={isQueryPanelModalOpened && true} />
      )}
    </div>
  );
}

export default ReportDesigner;
