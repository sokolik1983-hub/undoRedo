import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setColumns, showFilterPanel } from '../../../data/reducers/trash';
import ColumnsList from '../../../common/components/ColumnsList';
import Button from '../../../common/components/Button';
import styles from '../../Audit/FilterPanel/FilterPanel.module.scss';
import BinFilters from './BinFilters/BinFilters';

function FilterPanel() {
  const dispatch = useDispatch();
  const trash = useSelector(state => state.app.trash);
  const wrapperRef = useRef(null);

  const handleHideFilterPanel = event => {
    event.stopPropagation();
    dispatch(showFilterPanel());
  };

  const handleSetColumns = newColumns => {
    dispatch(setColumns(newColumns));
  };

  if (!trash.ui.showFilterPanel) return null;

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
      <ColumnsList arr={trash.columns} handleSetColumns={handleSetColumns} />
      <BinFilters />
    </div>
  );
}

export default FilterPanel;