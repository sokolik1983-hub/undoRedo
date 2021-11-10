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

  const handleSetColumns = newColumns => {
    dispatch(setColumns(newColumns));
  };

  const handleSetFilters = value => {
    dispatch(setFilters(value));
  };

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
      <AuditColumnsList audit={audit} handleSetColumns={handleSetColumns} />
      <AuditFilters
        audit={audit}
        handleSetFilters={handleSetFilters}
        actions={actions}
      />
    </div>
  );
}

export default FilterPanel;
