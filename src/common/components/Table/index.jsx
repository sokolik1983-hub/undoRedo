import React from 'react';
import Pagination from 'react-js-pagination';
import PropTypes from 'prop-types';
import lodash from 'lodash';
import styles from './Table.module.scss';

/**
 * @param headersArr - массив объектов для отрисовки заголовков колонок таблицы
 * @param bodyArr - массив объектов для отрисовки значений в тело таблицы
 * @param size - строка для установки размеры таблицы из трех: small, medium, large, по умолчанию - medium
 * @param isHeaderSticky - булево значение для прилипающего хэдереа
 * @param setColumnsHandler - функция для передачи значений в стор при перетаскивании колонок
 * @param actions - элемент в конце строк таблицы для реализации событий удаления/редактирования итд.
 * @param itemsCountPerPage - число для вывода количества строк для пагинации
 * @param activePage - число текущей страницы для пагинации
 * @param setActivePageHandler - функция для передачи в стор числа страницы для пагинации

 */

const Table = ({
  headersArr = [],
  bodyArr = [],
  size = 'medium',
  isHeaderSticky = true,
  setColumnsHandler,
  actions,
  itemsCountPerPage = 10,
  setActivePageHandler,
  activePage
}) => {
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

  function handlePageChange(pageNumber) {
    setActivePageHandler(pageNumber);
  }

  return (
    <div>
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

        {bodyArr
          .slice(
            activePage * itemsCountPerPage,
            activePage * itemsCountPerPage + itemsCountPerPage
          )
          .map(item => (
            <tr key={item.id}>
              {lodash
                .sortBy(headersArr, 'order')
                .filter(column => column.show)
                .map(column => (
                  <td key={column.id}>{item[column.id]}</td>
                ))}
              {actions?.length > 0 && actions}
            </tr>
          ))}
      </table>
      <Pagination
        activePage={activePage}
        itemsCountPerPage={itemsCountPerPage}
        totalItemsCount={bodyArr.length}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
        innerClass={styles.pagination}
        activeLinkClass={styles.activeLink}
      />
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
  itemsCountPerPage: PropTypes.number,
  setActivePageHandler: PropTypes.func,
  activePage: PropTypes.number,
};

export default Table;
