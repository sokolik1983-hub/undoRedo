import React, { useEffect } from 'react';
import lodash from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import {
  clearTrash,
  getTrashEvents,
  restoreTrashItem
} from '../../data/actions/trash';
import { setColumns, showFilterPanel } from '../../data/reducers/trash';
import Table from '../../common/components/Table/index';
import Button from '../../common/components/Button/index';
import Tooltip from '../../common/components/Tooltip/index';
import styles from './RecycleBin.module.scss';
import FilterPanel from './FilterPanel';

function RecycleBin() {
  const dispatch = useDispatch();
  const trash = useSelector(state => state.app.trash);
  const trashItems = trash.items;

  useEffect(() => {
    dispatch(getTrashEvents());
  }, []);

  const trashTableHeadersArr = lodash
    .sortBy(trash.columns, 'order')
    .filter(item => item.show);

  const handleRestore = item => () => {
    restoreTrashItem({ id: item.id, type_name: item.type_name });
    console.log(item);
  };

  const handleClear = () => {
    clearTrash({});
  };

  const handleSetColumns = value => {
    dispatch(setColumns(value));
  };

  const handleShowFilters = event => {
    event.stopPropagation();
    dispatch(showFilterPanel());
  };

  const actions = [{ onClick: handleRestore, text: 'Восстановить' }];

  return (
    <div className={styles.root}>
      <h3>RecycleBin Content</h3>
      <button onClick={handleClear} type="button">
        Очистить корзину
      </button>
      <Table
        headersArr={trashTableHeadersArr}
        bodyArr={trashItems}
        size="small"
        setColumnsHandler={handleSetColumns}
        actions={actions}
      />
      <Tooltip
        position="bottom"
        content="Показать фильтры для редактирования таблицы"
      >
        <Button size="large" onClick={handleShowFilters} type="button">
          Показать фильтры
        </Button>
      </Tooltip>

      <FilterPanel />
    </div>
  );
}

export default RecycleBin;
