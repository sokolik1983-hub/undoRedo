import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import lodash from 'lodash';
import { getAuditEvents } from '../../data/actions/audit';
import {
  setColumns,
  showFilterPanel,
  setActivePage
} from '../../data/reducers/audit';
import styles from './Audit.module.scss';
import FilterPanel from './FilterPanel';
import { setCurrentPage } from '../../data/reducers/ui';
import { AUDIT_PAGE } from '../../common/constants/pages';
import Table from '../../common/components/Table/index';

function Audit() {
  const dispatch = useDispatch();
  const audit = useSelector(state => state.app.audit);
  const activePage = useSelector(state => state.app.audit.activePage);

  useEffect(() => {
    dispatch(setCurrentPage(AUDIT_PAGE));
    dispatch(getAuditEvents({ filters: { ...audit.filters } }));
  }, []);

  useEffect(() => {
    dispatch(getAuditEvents({ filters: { ...audit.filters } }));
  }, [audit.filters]);

  const auditTableHeadersArr = lodash
    .sortBy(audit.columns, 'order')
    .filter(item => item.show);

  const handleSetColumns = value => {
    dispatch(setColumns(value));
  };

  function handleShowFilters(event) {
    event.stopPropagation();
    dispatch(showFilterPanel());
  }

  const handleSetActivePage = value => {
    dispatch(setActivePage(value));
  };

  return (
    <div className={styles.root}>
      <Table
        headersArr={auditTableHeadersArr}
        bodyArr={audit.events}
        setColumnsHandler={handleSetColumns}
        size="small"
        setActivePageHandler={handleSetActivePage}
        activePage={activePage}
      />

      <FilterPanel />

      <button
        style={{ margin: '0 auto', height: '42px'}}
        onClick={handleShowFilters}
        type="button"
      >
        Показать фильтры
      </button>
    </div>
  );
}

export default Audit;
