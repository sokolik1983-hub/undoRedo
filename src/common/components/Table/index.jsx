import React from 'react';
import PropTypes from 'prop-types';
import lodash from 'lodash';
import classes from './Table.module.scss';

const Table = ({
  headersArr = [],
  bodyArr = [],
  size = 'medium',
  isHeaderSticky = true,
  setColumnsHandler
}) => {
  const getStyles = () => {
    if (size === 'small') return classes.tableSmall;
    if (size === 'large') return classes.tableLarge;
    return classes.tableMedium;
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
    <table>
      <thead className={isHeaderSticky ? classes.tableHeaderSticky : null}>
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
                className={getStyles()}
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
              <td className={getStyles()} key={item.id}>
                {item.name}
              </td>
            ))}
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
  setColumnsHandler: PropTypes.func
};

export default Table;
