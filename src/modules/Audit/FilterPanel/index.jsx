import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, showFilterPanel } from '../../../data/reducers/audit';
import styles from './FilterPanel.module.scss';

function FilterPanel() {
  const dispatch = useDispatch();
  const audit = useSelector(state => state.audit);
  const wrapperRef = useRef(null);

  function handleSetFilters() {
    dispatch(setFilters({}));
  }

  function handleHideFilterPanel() {
    dispatch(showFilterPanel());
  }

  if (!audit.ui.showFilterPanel) return null;

  return (
    <div className={styles.root} onClick={handleSetFilters} ref={wrapperRef}>
      <button onClick={handleHideFilterPanel} type="button" className={styles.buttonClose}>
        close
      </button>
      FilterPanel
    </div>
  );
}

export default FilterPanel;
