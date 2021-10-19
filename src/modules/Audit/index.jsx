import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import lodash from 'lodash';
import { getAuditEvents } from '../../data/actions/audit';
import { setColumns, showFilterPanel } from '../../data/reducers/audit';
import styles from './Audit.module.scss';
import FilterPanel from './FilterPanel';
import { setCurrentPage } from '../../data/reducers/ui';
import { AUDIT_PAGE } from '../../common/constants/pages';
import Table from '../../common/components/Table/index';
import Button from '../../common/components/Button/index';
import IconButton from '../../common/components/IconButton/index';

function Audit() {
  const dispatch = useDispatch();
  const audit = useSelector(state => state.app.audit);

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

  return (
    <div className={styles.root}>
      <Table
        headersArr={auditTableHeadersArr}
        bodyArr={audit.events}
        setColumnsHandler={handleSetColumns}
        size="small"
      />

      <FilterPanel />

      <Button size="large" onClick={handleShowFilters} type="button" active>
        Показать фильтры
      </Button>

      <IconButton>
        <svg
          fill="none"
          height="20"
          viewBox="0 0 20 20"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="currentColor">
            <g>
              <path d="M6.25 3.5a3 3 0 100 6 3 3 0 000-6zm-1.5 3a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0zM2.69 11.57c.96-.55 2.22-.82 3.56-.82s2.6.27 3.56.82c.98.56 1.69 1.47 1.69 2.68 0 .7-.28 1.3-.78 1.71-.48.39-1.1.54-1.72.54H3.5c-.61 0-1.24-.15-1.72-.54-.5-.4-.78-1-.78-1.71 0-1.21.71-2.12 1.69-2.68zm.75 1.3c-.65.37-.94.84-.94 1.38 0 .3.1.44.22.54.14.11.4.21.78.21H9c.39 0 .64-.1.78-.21.12-.1.22-.25.22-.54 0-.54-.29-1-.94-1.38-.66-.39-1.65-.62-2.81-.62s-2.15.23-2.81.62zM13.75 3.5a3 3 0 100 6 3 3 0 000-6zm-1.5 3a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0z" />
            </g>
            <path d="M13.75 12.25c-.23 0-.45.01-.68.03a.75.75 0 11-.14-1.49c.27-.03.54-.04.82-.04 1.34 0 2.6.27 3.56.82.98.56 1.69 1.47 1.69 2.68 0 .7-.28 1.3-.78 1.71-.48.39-1.1.54-1.72.54h-3a.75.75 0 010-1.5h3c.39 0 .64-.1.78-.21.12-.1.22-.25.22-.54 0-.54-.29-1-.94-1.38a5.77 5.77 0 00-2.81-.62z" />
          </g>
        </svg>
      </IconButton>
    </div>
  );
}

export default Audit;
