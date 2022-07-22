import lodash from 'lodash';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PAGE } from '../../common/constants/pages';
import { setCurrentPage } from '../../data/reducers/ui';
import styles from './Audit.module.scss';
import ConnectorsList from './ConnectorsList/ConnectorsList';
import FilterPanel from './FilterPanel';

function Audit() {
  const dispatch = useDispatch();
  const audit = useSelector((state) => state.app.audit);

  useEffect(() => {
    dispatch(setCurrentPage(PAGE.AUDIT));
  }, []);

  const auditTableHeadersArr = lodash
    .sortBy(audit.columns, 'order')
    .filter((item) => item.show);

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
