import React from 'react';
import PropTypes from 'prop-types';
import lodash from 'lodash';
import styles from './Table.module.scss';

const Table = ({
  headersArr = [],
  bodyArr = [],
  size = 'medium',
  isHeaderSticky = true,
  setColumnsHandler,
  actions
}) => {
  const getStyles = () => {
    if (size === 'small') return styles.tableSmall;
    if (size === 'large') return styles.tableLarge;
    return styles.tableMedium;
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
      if (selectedEl.order < targetOrder) {
        if (item.id === selectedEl.id) {
          item.order = targetOrder;
        } else if (item.order > selectedEl.order && item.order <= targetOrder) {
          item.order -= 1;
        }
      }
      if (selectedEl.order > targetOrder) {
        if (item.id === selectedEl.id) {
          item.order = targetOrder;
        } else if (item.order < selectedEl.order && item.order >= targetOrder) {
          item.order += 1;
        }
      }

      return item;
    });
    event.dataTransfer.clearData();
    setColumnsHandler(newColumns);
  }

  return (
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
      <tbody>
        <tr>
          {bodyArr &&
            bodyArr.map(item => (
              <td key={item.id}>
                {item.name}
              </td>
            ))}
          {actions}
        </tr>
      </tbody>
    </table>
  );
};

Table.propTypes = {
  headersArr: PropTypes.arrayOf(PropTypes.object).isRequired,
  bodyArr: PropTypes.arrayOf(PropTypes.object).isRequired,
  size: PropTypes.string,
  isHeaderSticky: PropTypes.bool,
  setColumnsHandler: PropTypes.func,
  actions: PropTypes.arrayOf(PropTypes.object),
};

export default Table;
