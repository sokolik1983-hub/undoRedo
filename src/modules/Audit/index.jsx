import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import lodash from 'lodash';
import { PAGE } from '../../common/constants/pages';
import FilterPanel from './FilterPanel';
import { setCurrentPage } from '../../data/reducers/ui';
import { getAuditEvents } from '../../data/actions/audit';
import styles from './Audit.module.scss';
import ConnectorsList from './ConnectorsList/ConnectorsList';

function Audit() {
  const dispatch = useDispatch();
  const audit = useSelector(state => state.app.audit);

  useEffect(() => {
    dispatch(setCurrentPage(PAGE.AUDIT));
    dispatch(getAuditEvents({ filters: { ...audit.filters } }));
  }, []);

  useEffect(() => {
    dispatch(getAuditEvents({ filters: { ...audit.filters } }));
  }, [audit.filters]);

  const auditTableHeadersArr = lodash
    .sortBy(audit.columns, 'order')
    .filter(item => item.show);

  return (
    <div className={styles.root}>
      <FilterPanel />
      <ConnectorsList
        audit={audit.events}
        auditHeaders={auditTableHeadersArr}
      />
    </div>
  );
}

export default Audit;
