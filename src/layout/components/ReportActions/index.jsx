/* eslint-disable react/jsx-curly-newline */
/* eslint-disable no-unused-vars */
import React, { useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

import { REDIRECT_LINKS, TOAST_TYPE } from '../../../common/constants/common';
import {
  GRAPH_ICONS,
  TABLE_ICONS,
} from '../../../common/constants/reportDesigner/reportDesignerIcons';
import { REPORT_PAGE_ACTIONS } from '../../../common/constants/reportDesigner/reportDesignerMenuIcons';
import useClickOutside from '../../../common/helpers/useClickOutside';
import { setQueryPanelModal } from '../../../data/actions/universes';
import {
  handleRedo,
  handleUndo,
  saveReport,
} from '../../../data/reportDesigner/reportsData/reportsDataActions';
import {
  setCreatingElement,
  setFormulaEditorVisible,
} from '../../../data/reportDesigner/reportsUi/reportDesignerUIReducer';
import styles from './ReportActions.module.scss';
import SaveReportModal from './SaveReportModal';
import ZoomSlider from './ZoomSlider';

const ReportActions = () => {
  const [isSaveReportOpen, setIsSaveReportOpen] = useState(false);
  const [isTableOpen, setIsTableOpen] = useState(false);
  const [isGraphOpen, setIsGraphOpen] = useState(false);
  const [isZoomBlockOpen, setIsZoomBlockOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const reportName = useSelector(
    (state) => state.app.reportDesigner?.reportsData?.present?.header?.name,
  );

  const handleTableTypeChange = (type) => {
    setIsTableOpen(!isTableOpen);
    dispatch(setCreatingElement(type));
  };

  const handleGraphTypeChange = (type) => {
    setIsGraphOpen(!isGraphOpen);
    dispatch(setCreatingElement(type));
  };

  const actions = {
    save: () =>
      !reportName
        ? setIsSaveReportOpen(true)
        : dispatch(
            saveReport({
              name: reportName,
            }),
          ),
    undo: () => dispatch(handleUndo()),
    redo: () => dispatch(handleRedo()),
    zoom: () => setIsZoomBlockOpen(!isZoomBlockOpen),
    setTable: () => setIsTableOpen(!isTableOpen),
    setGraph: () => setIsGraphOpen(!isGraphOpen),
    formula: () => dispatch(setFormulaEditorVisible()),
    showQueryPanel: () => dispatch(setQueryPanelModal(true)),
    addCell: () => dispatch(setCreatingElement('cell')),
  };

  const clickRef = useRef();
  useClickOutside(clickRef, () => {
    setIsTableOpen(false);
    setIsGraphOpen(false);
    setIsZoomBlockOpen(false);
  });

  return (
    <div className={styles.actionsContainer}>
      {REPORT_PAGE_ACTIONS.map((item) => {
        return (
          <>
            <div
              className={
                item.type === 'divider' ? styles.divider : styles.actionWrapper
              }
              title={item.title || ''}
              onClick={() =>
                actions[item.action] ? actions[item.action]() : null
              }
            >
              {item.icon}
            </div>
          </>
        );
      })}

      {isTableOpen && (
        <div className={styles.tableTypes} ref={clickRef}>
          {TABLE_ICONS.map((i) => (
            <div
              className={styles.iconsWrapper}
              onClick={() => handleTableTypeChange(i.type)}
              key={i.text}
            >
              {i.icon}
              <p className={styles.iconsText}>{i.text}</p>
            </div>
          ))}
        </div>
      )}
      {isGraphOpen && (
        <div className={styles.graphTypes} ref={clickRef}>
          {GRAPH_ICONS.map((i) => (
            <div
              className={styles.iconsWrapper}
              onClick={() => handleGraphTypeChange(i.type)}
              key={i.text}
            >
              {i.icon}
              <p className={styles.iconsText}>{i.text}</p>
            </div>
          ))}
        </div>
      )}
      {isZoomBlockOpen && (
        <div className={styles.zoomSlider} ref={clickRef}>
          <ZoomSlider />
        </div>
      )}
      {isSaveReportOpen && (
        <SaveReportModal
          isOpen={isSaveReportOpen}
          onSave={(name) => {
            dispatch(
              saveReport(
                {
                  name: name || 'Произвольный отчет',
                  folder_id: '10003',
                },
                // id => {
                //   window.location.pathname = `${REDIRECT_LINKS.REPORT_SHOW}/${id}`;
                // }
              ),
            ); // тестовая папка рутова
            setIsSaveReportOpen(false);
          }}
          onCancel={() => setIsSaveReportOpen(false)}
        />
      )}
    </div>
  );
};

export default ReportActions;
