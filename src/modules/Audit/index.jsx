import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { PAGE } from '../../common/constants/pages';
// import { showFilterPanel } from '../../data/reducers/audit';
// import FilterPanel from './FilterPanel';
import { setCurrentPage } from '../../data/reducers/ui';
import styles from './Audit.module.scss';
// import Table from '../../common/components/Table/index';
// import Button from '../../common/components/Button/index';
// import Tooltip from '../../common/components/Tooltip/index';
import ConnectorsList from './ConnectorsList/ConnectorsList';

function Audit() {
  const dispatch = useDispatch();
  // const audit = useSelector(state => state.app.audit);

  useEffect(() => {
    dispatch(setCurrentPage(PAGE.AUDIT));
    // dispatch(getAuditEvents({ filters: { ...audit.filters } }));
  }, []);

  // useEffect(() => {
  //   dispatch(getAuditEvents({ filters: { ...audit.filters } }));
  // }, [audit.filters]);

  // const auditTableHeadersArr = lodash
  //   .sortBy(audit.columns, 'order')
  //   .filter(item => item.show);

  // const handleSetColumns = value => {
  //   dispatch(setColumns(value));
  // };

  // function handleShowFilters(event) {
  //   event.stopPropagation();
  //   dispatch(showFilterPanel());
  // }

  return (
    <div className={styles.root}>
      {/* <Table
        headersArr={auditTableHeadersArr}
        bodyArr={audit.events}
        setColumnsHandler={handleSetColumns}
        size="small"
      /> */}

      <ConnectorsList />

      {/* <FilterPanel />

      <Tooltip
        position="bottom"
        content="Показать фильтры для редактирования таблицы"
      >
        <div size="large" onClick={handleShowFilters} type="button">
          Показать фильтры
        </div>
      </Tooltip> */}
    </div>
  );
}

export default Audit;
