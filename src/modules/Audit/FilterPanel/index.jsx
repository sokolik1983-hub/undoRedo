import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setColumns,
  setFilters,
  showFilterPanel
} from '../../../data/reducers/audit';
import styles from './FilterPanel.module.scss';
import AuditFilters from './AuditFilters/AuditFilters';
import ColumnsList from '../../../common/components/ColumnsList';
import Button from '../../../common/components/Button';

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
      <Button
        onClick={handleHideFilterPanel}
        type="button"
        className={styles.buttonClose}
      >
        Закрыть
      </Button>

      <h3 className={styles.title}>Фильтрация</h3>
      <ColumnsList arr={audit.columns} handleSetColumns={handleSetColumns} />
      <AuditFilters
        audit={audit}
        handleSetFilters={handleSetFilters}
        actions={actions}
      />
    </div>
  );
}

export default FilterPanel;
