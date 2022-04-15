/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { REPORT_PAGE_ACTIONS } from '../../../common/constants/common';
import styles from './ReportActions.module.scss';
import { handleUndo, handleRedo } 
from '../../../data/actions/newReportDesigner';
import { setTableType, setGraphType } from '../../../data/reducers/newReportDesigner';
import { TABLE_ICONS, GRAPH_ICONS } from '../../../common/constants/reportDesignerIcons';
import useClickOutside from '../../../common/helpers/useClickOutside';

const NewReportActions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isGraphOpen, setIsGraphOpen] = useState(false);
  const dispatch = useDispatch();
  
  const tableType = useSelector(state => state.app.newReportDesigner.tableType);
  const graphType = useSelector(state => state.app.newReportDesigner.graphType);

  const handleTableTypeChange = (type) => {
    setIsOpen(!isOpen);
    dispatch(setTableType(type));
  };

  const handleGraphTypeChange = (type) => {
    setIsGraphOpen(!isGraphOpen);
    dispatch(setGraphType(type));
  };

  const actions = {
    undo: () => dispatch(handleUndo()),
    redo: () => dispatch(handleRedo()),
    setTable: () => setIsOpen(!isOpen),
    setGraph: () =>setIsGraphOpen(!isGraphOpen),
  };

  const clickRef = useRef();
  useClickOutside(clickRef, () => {setIsOpen(false); setIsGraphOpen(false)});

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
      {isOpen && (
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
