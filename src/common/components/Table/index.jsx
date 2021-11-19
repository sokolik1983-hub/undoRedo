import React, { useState } from 'react';
import Pagination from 'react-js-pagination';
import PropTypes from 'prop-types';
import lodash from 'lodash';
import styles from './Table.module.scss';
import Select from '../Select';
import Button from '../Button'

/**
 * @param headersArr - массив объектов для отрисовки заголовков колонок таблицы
 * @param bodyArr - массив объектов для отрисовки значений в тело таблицы
 * @param size - строка для установки размеры таблицы из трех: small, medium, large, по умолчанию - medium
 * @param isHeaderSticky - булево значение для прилипающего хэдереа
 * @param setColumnsHandler - функция для передачи значений в стор при перетаскивании колонок
 * @param actions - массив элементов в конце строк таблицы для реализации событий удаления/редактирования итд.
 * @param paginationAlign - строка описывающая позиционирование пагинации в таблице: 'flex-left', 'flex-right', 'center'
 */

const Table = ({
  headersArr = [],
  bodyArr = [],
  size = 'medium',
  isHeaderSticky = true,
  setColumnsHandler,
  actions,
  paginationAlign = 'flex-start'
}) => {
  const [activePage, setActivePage] = useState(1);
  const [itemsCountPerPage, setItemsCountPerPage] = useState(10);

  const perPageValues = [
    { text: '10', value: 10 },
    { text: '20', value: 20 },
    { text: '30', value: 30 },
    { text: '50', value: 50 },
    { text: 'Все', value: 'all' }
  ];

  const getStyles = () => {
    switch (size) {
      case 'small':
        return styles.tableSmall;
      case 'large':
        return styles.tableLarge;
      default:
        return styles.tableMedium;
    }
  };

  function allowDrop(event) {
    event.preventDefault();
  }

  function handleDropObject(event) {
    const selectedEl = JSON.parse(event.dataTransfer.getData('text'));
    const clonedColumns = lodash.cloneDeep(headersArr);
    const targetOrder = lodash.find(headersArr, it => it.id === event.target.id)
      ?.order;

    const newColumns = clonedColumns.map(item => {
      if (selectedEl.order < targetOrder)
        if (item.id === selectedEl.id) {
          item.order = targetOrder;
        } else if (item.order > selectedEl.order && item.order <= targetOrder)
          item.order -= 1;
      if (selectedEl.order > targetOrder)
        if (item.id === selectedEl.id) {
          item.order = targetOrder;
        } else if (item.order < selectedEl.order && item.order >= targetOrder) {
          item.order += 1;
        }
      return item;
    });

    event.dataTransfer.clearData();
    setColumnsHandler(newColumns);
  }

  const handlePageChange = pageNumber => {
    setActivePage(pageNumber);
  };

  const handleRowsPerPageChange = value => {
    if (value === 'all') {
      setItemsCountPerPage(value);
    } else {
      setItemsCountPerPage(Number(value));
    }
  };

  /*  const getArr = () => {
    if (itemsCountPerPage === 'all') return bodyArr;
    return bodyArr.slice(
      activePage * itemsCountPerPage,
      activePage * itemsCountPerPage + itemsCountPerPage
    );
  }; */

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: paginationAlign
      }}
    >
      <table className={getStyles()}>
        <thead className={isHeaderSticky ? styles.tableHeaderSticky : null}>
          <tr>
            {headersArr &&
              headersArr.map(column => (
                <th
                  key={column.id}
                  id={column.id}
                  order={column.order}
                  draggable
                  onDragStart={event => {
                    event.dataTransfer.setData(
                      'text/plain',
                      JSON.stringify(column)
                    );
                  }}
                  onDrop={handleDropObject}
                  onDragOver={allowDrop}
                >
                  {column.name}
                </th>
              ))}
          </tr>
        </thead>

        {bodyArr &&
          bodyArr.map(item => (
            <tr key={item.id}>
              {lodash
                .sortBy(headersArr, 'order')
                .filter(column => column.show)
                .map(column => (
                  <td key={column.id}>{item[column.id]}</td>
                ))}
              {actions &&
                actions.map(el => {
                  return (
                    <Button size="small" type="button" onClick={el.onClick(item)}>
                      {el.text}
                    </Button>
                  );
                })}
            </tr>
          ))}
      </table>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Pagination
          activePage={activePage}
          itemsCountPerPage={itemsCountPerPage}
          totalItemsCount={bodyArr?.length}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          innerClass={styles.pagination}
          activeLinkClass={styles.activeLink}
        />

        <span>Количество строк на странице:</span>

        <Select
          name="table"
          options={perPageValues}
          onSelectItem={handleRowsPerPageChange}
        />
      </div>
    </div>
  );
};

Table.propTypes = {
  headersArr: PropTypes.arrayOf(PropTypes.object).isRequired,
  bodyArr: PropTypes.arrayOf(PropTypes.object).isRequired,
  size: PropTypes.string,
  isHeaderSticky: PropTypes.bool,
  setColumnsHandler: PropTypes.func,
  actions: PropTypes.arrayOf(PropTypes.object),
  paginationAlign: PropTypes.string
};

export default Table;
