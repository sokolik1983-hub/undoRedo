/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { REPORT_PAGE_ACTIONS } from '../../../common/constants/reportDesigner/reportDesignerMenuIcons';
import styles from './ReportActions.module.scss';
import { handleUndo, handleRedo } 
from '../../../data/actions/newReportDesigner';
import { setTableType, setGraphType, setCreatingElement } from '../../../data/reducers/reportDesigner';
import { TABLE_ICONS, GRAPH_ICONS } from '../../../common/constants/reportDesigner/reportDesignerIcons';
import useClickOutside from '../../../common/helpers/useClickOutside';
import { setQueryPanelModal } from '../../../data/actions/universes';


const NewReportActions = () => {
  const [isTableOpen, setIsTableOpen] = useState(false);
  const [isGraphOpen, setIsGraphOpen] = useState(false);
  const dispatch = useDispatch();

  const handleTableTypeChange = (type) => {
    setIsTableOpen(!isTableOpen);
    // dispatch(setTableType(type));
    dispatch(setCreatingElement(type));
  };

  const handleGraphTypeChange = (type) => {
    setIsGraphOpen(!isGraphOpen);
    // dispatch(setGraphType(type));
    dispatch(setCreatingElement(type));
  };

  const actions = {
    undo: () => dispatch(handleUndo()),
    redo: () => dispatch(handleRedo()),
    setTable: () => setIsTableOpen(!isTableOpen),
    setGraph: () => setIsGraphOpen(!isGraphOpen),
    showQueryPanel: () => dispatch(setQueryPanelModal(true))
  };

  const clickRef = useRef();
  useClickOutside(clickRef, () => {setIsTableOpen(false); setIsGraphOpen(false)});

  return (
    <div className={styles.actionsContainer}>
      {REPORT_PAGE_ACTIONS.map(item => {
        return (
          <>
            <div
              className={styles.actionWrapper}
              title={item.title || ''}
              onClick={() => actions[item.action] ? actions[item.action]() : null}
            >
              {item.icon}
            </div>
          </>
        );
      })}
      {isTableOpen && (
        <div className={styles.tableTypes} ref={clickRef}>
          {TABLE_ICONS.map(i => (
            <div className={styles.iconsWrapper} onClick={()=> handleTableTypeChange(i.type)} key={i.text}>
              {i.icon}
              <p className={styles.iconsText}>
                {i.text}
              </p>
            </div>
          ))}
        </div>
      )}
      {isGraphOpen && (
        <div className={styles.graphTypes} ref={clickRef}>
          {GRAPH_ICONS.map(i => (
            <div className={styles.iconsWrapper} onClick={()=> handleGraphTypeChange(i.type)} key={i.text}>
              {i.icon}
              <p className={styles.iconsText}>
                {i.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewReportActions;
