import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../data/reducers/ui';
import { PAGE } from '../../common/constants/pages';
import styles from './SymlayersDesigner.module.scss';
import Sidebar from './Sidebar';
import TablesList from './TablesList';
import SchemaTables from './SchemaTables';

function SymlayersDesigner() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(setCurrentPage(PAGE.SEMANTIC));
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <Sidebar />
        <div className={styles.schema}>
          <div className={styles.header}>
            <TablesList title="Связи" />
            <TablesList title="Контексты" />
          </div>
          <div className={styles.tables}>
            <SchemaTables />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SymlayersDesigner;
