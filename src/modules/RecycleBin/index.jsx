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
import { setCurrentPage } from '../../data/reducers/ui';
import { PAGE } from '../../common/constants/pages';

function RecycleBin() {
  const dispatch = useDispatch();
  const trash = useSelector(state => state.app.trash);
  const trashItems = trash.items;
  useEffect(() => {
    dispatch(setCurrentPage(PAGE.TRASH));
  }, []);

  const trashItemsWithUniqueId = trashItems.map(item => {
    return { ...item, uniqueId: item.id + item.type_name };
  });

  useEffect(() => {
    dispatch(getTrashEvents({ filters: { ...trash.filters } }));
  }, []);

  const trashTableHeadersArr = lodash
    .sortBy(trash.columns, 'order')
    .filter(item => item.show);

  const handleRestore = item => () => {
    dispatch(restoreTrashItem({ id: item.id, type_name: item.type_name }));
    console.log({ id: item.id, type_name: item.type_name });
  };

  const handleClear = () => {
    dispatch(clearTrash());
  };

  const handleSetColumns = value => {
    dispatch(setColumns(value));
  };

  const handleShowFilters = event => {
    event.stopPropagation();
    dispatch(showFilterPanel());
  };

  const actions = [{ onClick: handleRestore, text: 'Восстановить', id: 1 }];

  return (
    <div className={styles.root}>
      <h3>Корзина</h3>
      <Button onClick={handleClear} type="button">
        Очистить корзину
      </Button>
      <Table
        headersArr={trashTableHeadersArr}
        bodyArr={trashItemsWithUniqueId}
        size="small"
        setColumnsHandler={handleSetColumns}
        actions={actions}
      />
      <Tooltip
        position="bottom"
        content="Показать фильтры для редактирования таблицы"
      >
        <Button onClick={handleShowFilters} type="button">
          Показать фильтры
        </Button>
      </Tooltip>

      <FilterPanel />
    </div>
  );
}

export default RecycleBin;
