import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setColumns,
  setFilters,
  showFilterPanel
} from '../../../data/reducers/audit';
import styles from './FilterPanel.module.scss';
import AuditColumnsList from './AuditColumnsList';
import AuditFilters from './AuditFilters';

function FilterPanel() {
  const dispatch = useDispatch();
  const audit = useSelector(state => state.app.audit);
  const wrapperRef = useRef(null);

  const actions = useSelector(
    state => state.app.data.dictionaries.audit_action
  );

  const handleHideFilterPanel = event => {
    event.stopPropagation();
    dispatch(showFilterPanel());
  };

  const setColumnsHandler = (newColumns) => {
    dispatch(setColumns(newColumns));
  }

  if (!audit.ui.showFilterPanel) return null;

  return (
    <div className={styles.root} ref={wrapperRef}>
      <button
        onClick={handleHideFilterPanel}
        type="button"
        className={styles.buttonClose}
      >
        Закрыть
      </button>

      <h3>Фильтрация</h3>
      <AuditColumnsList
        audit={audit}
        setColumnsHandler={setColumnsHandler}
      />
      <AuditFilters
        audit={audit}
        dispatch={dispatch}
        setFilters={setFilters}
        actions={actions}
      />
    </div>
  );
}

export default FilterPanel;