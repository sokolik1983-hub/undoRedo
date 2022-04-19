/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { REPORT_PAGE_ACTIONS } from '../../../common/constants/reportDesigner/reportDesignerMenuIcons';
import styles from './ReportActions.module.scss';
import { handleUndo, handleRedo } 
from '../../../data/actions/newReportDesigner';
import TextInput from '../../../common/components/TextInput';
import { setTableType, setGraphType, setCreatingElement } from '../../../data/reducers/reportDesigner';
import { TABLE_ICONS, GRAPH_ICONS } from '../../../common/constants/reportDesigner/reportDesignerIcons';
import useClickOutside from '../../../common/helpers/useClickOutside';
import { setQueryPanelModal } from '../../../data/actions/universes';
import { ReactComponent as NavIcon } from '../../assets/reportDesigner/nav.svg';
import { ReactComponent as ArrowIcon } from '../../assets/reportDesigner/arrow.svg';

const pages = 27;


const NewReportActions = () => {
  const [isTableOpen, setIsTableOpen] = useState(false);
  const [isGraphOpen, setIsGraphOpen] = useState(false);
  const dispatch = useDispatch();
  const [curPage, setCurPage] = useState(1);

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

  const handlePageChange = (e) => {
    setCurPage(Number(e.target.value.replace(/\D/g, '')));
  };

  const validateCurPage = (page) => {
    // eslint-disable-next-line no-nested-ternary
    return page === 0 ? '' : pages - page < 0 ? pages : page;
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
              className={
                item.type === 'divider' ? styles.divider : styles.actionWrapper
              }
              title={item.title || ''}
              onClick={() => actions[item.action] ? actions[item.action]() : null}
            >
              {item.icon}
            </div>
          </>
        );
      })}
      <div className={styles.navigation}>
        <div className={styles.firstPage} onClick={() => setCurPage(1)}>
          <p className={styles.firstPageText}>1</p> 
          <NavIcon />
        </div>
        <div className={styles.indents} onClick={() => curPage > 1 ? setCurPage(curPage-1) : curPage}>
          <ArrowIcon />
        </div>
        <div className={styles.input}>
          <TextInput value={validateCurPage(curPage)} onChange={handlePageChange} className={styles.inpitValue} id='23' />
        </div>
        <div className={styles.indents} onClick={() => curPage < pages ? setCurPage(curPage+1) : curPage}>
          <ArrowIcon className={styles.rotate} />
        </div>
        <div className={styles.lastPage} onClick={() => setCurPage(pages)}>
          <NavIcon className={styles.rotate} />
          <p className={styles.lastPageText}>{pages}</p>
        </div>
      </div>
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
