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
import Tooltip from '../../common/components/Tooltip/index';

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

<<<<<<< HEAD
      <Tooltip position="bottom" content="Показать фильтры для редактирования таблицы">
        <Button size="large" onClick={handleShowFilters} type="button" active>
          Показать фильтры
        </Button>
      </Tooltip>
=======
      <Button size="large" onClick={handleShowFilters} type="button" active>
        Показать фильтры
      </Button>
>>>>>>> master
    </div>
  );
}

export default Audit;
