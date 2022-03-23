import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from './QueryPanel.module.scss';
import { setCurrentPage } from '../../data/reducers/ui';
import { PAGE } from '../../common/constants/pages';
import Button from '../../common/components/Button';

function QueryPanel() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentPage(PAGE.QUERY_PANEL));
  }, []);

  function handleShowSelector() {
    return null;
  }

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <div className={styles.leftPanel}>
          <Button type="button" onClick={handleShowSelector}>
            Select universe
          </Button>
          Панель с объектами семантического слоя
        </div>
        <div className={styles.rightPanel}>
          <div className={styles.section}>objects</div>
          <div className={styles.section}>filters</div>
          <div className={styles.section}>results</div>
        </div>
      </div>
    </div>
  );
}

export default QueryPanel;
