/* eslint-disable no-debugger */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import clsx from 'clsx';
import React from 'react';
import lodash from 'lodash';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import TableChartIcon from '@material-ui/icons/TableChart';
import { getCurrentReport } from '../../helpers';
import styles from './DataTable.module.scss';
import {
  addTableColumn,
  columnObject
} from '../../../../data/reducers/reportDesigner';

function DataTable({
  blockStyles,
  structureItem,
  id,
  onSelectColumnHead,
  refContent
}) {
  const dispatch = useDispatch();
  const reportsUi = useSelector(state => state.app.reportDesigner.reportsUi.ui);
  const reportsData = useSelector(
    state => state.app.reportDesigner.reportsData.present
  );
  const currentReport = getCurrentReport(
    reportsData.reports,
    reportsData.activeReport
  );

  function getSelectedState(column) {
    return (
      reportsUi.selectedColumns &&
      reportsUi.selectedColumns[id]?.includes(column)
    );
  }

  function allowDrop(event) {
    event.preventDefault();
  }

  function handleDropObject(event) {
    const selectedEl = JSON.parse(event.dataTransfer.getData('text'));
    event.dataTransfer.clearData();

    dispatch(
      addTableColumn({
        column: { ...columnObject, object: { ...selectedEl } },
        id
      })
    );
  }

  function getSortedData() {
    if (currentReport?.dataset && structureItem?.sorting?.length > 0) {
      const { data, fields } = currentReport?.dataset;
      const result = [];

      const dataConverted = data.forEach(item => {
        const res = {};
        item.forEach((dataValue, idx) => {
          res[fields[idx]?.id] = dataValue;
        });

        result.push(res);
      });

      console.log(dataConverted, 'dataConverted');

      const sortFields = structureItem?.sorting?.map(
        sortingField => sortingField.field
      );
      const sortFieldsSort = structureItem?.sorting?.map(sortingField =>
        String(sortingField.sortingType).toLowerCase()
      );

      const sortArray = lodash.orderBy(result, sortFields, sortFieldsSort);

      return sortArray.map(item => {
        const itemConverted = [];
        lodash.keys(item).forEach(key => {
          itemConverted.push(item[key]);
        });
        return itemConverted;
      });
    }

    return currentReport?.dataset?.data;
  }

  function getCrossTableData(rowDimension, columnDimension) {
    const { data, fields } = currentReport?.dataset;
    const result = [];

    data.forEach(item => {
      const res = {};
      item.forEach((dataValue, idx) => {
        res[fields[idx]?.id] = dataValue;
      });

      result.push(res);
    });

    return {
      columns: [
        {
          name: columnDimension.object.name,
          values: lodash.keys(lodash.groupBy(result, columnDimension.object.id))
        }
      ],
      rows: [
        {
          name: rowDimension.object.name,
          values: lodash.keys(lodash.groupBy(result, rowDimension.object.id))
        }
      ]
    };
  }
  function getGrouppedTableData(rowDimension, columnDimension, measure) {
    const { data, fields } = currentReport?.dataset;
    const result = [];

    data.forEach(item => {
      const res = {};
      item.forEach((dataValue, idx) => {
        res[fields[idx]?.id] = dataValue;
      });

      result.push(res);
    });

    const res = {};
    const gropp = lodash.groupBy(result, rowDimension.object.id);

    lodash.keys(gropp).forEach(key => {
      const columnGroup = lodash.groupBy(result, columnDimension.object.id);

      lodash.keys(columnGroup).forEach(col => {
        const columnGroupSumm = lodash.sumBy(
          columnGroup[col].filter(
            itemSumm => itemSumm[rowDimension.object.id] === key
          ),
          it => parseFloat(it[measure.object.id])
        );
        res[key] = {
          ...res[key],
          [col]: columnGroupSumm
        };
      });
    });

    return res;
  }

  function renderVerticalTable() {
    return (
      <table style={{ ...blockStyles }}>
        <thead>
          <tr>
            {structureItem?.columns.map(col => (
              <th
                key={col.object.id}
                onClick={onSelectColumnHead(col.object.id)}
                className={clsx({
                  [styles['active_col']]: getSelectedState(col.object.id)
                })}
                style={{ ...col.header.styles }}
              >
                {col.object.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {getSortedData().map((item, rowIndex) => (
            // eslint-disable-next-line react/no-array-index-key
            <tr key={item + rowIndex}>
              {structureItem?.columns?.map(col => {
                const fieldIndex = lodash.findIndex(
                  currentReport?.dataset?.fields,
                  field => field.id === col.object.id
                );
                return (
                  <td
                    // eslint-disable-next-line react/no-array-index-key
                    key={`${item[fieldIndex]}.${rowIndex}`}
                    className={clsx({
                      [styles['active_col']]: getSelectedState(col.object.id)
                    })}
                    style={{ ...col.cells.styles }}
                  >
                    {item[fieldIndex]}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  function renderHorizontalTable() {
    return (
      <table style={{ ...blockStyles }}>
        <tbody>
          {structureItem?.columns.map(col => (
            <tr
              key={col.object.id}
              onClick={onSelectColumnHead(col.object.id)}
              className={clsx({
                [styles['active_col']]: getSelectedState(col.object.id)
              })}
              style={{ ...col.header.styles }}
            >
              <td>{col.object.name}</td>
              {getSortedData().map((item, rowIndex) => {
                // eslint-disable-next-line react/no-array-index-key
                const fieldIndex = lodash.findIndex(
                  currentReport?.dataset?.fields,
                  field => field.id === col.object.id
                );
                return (
                  <td
                    // eslint-disable-next-line react/no-array-index-key
                    key={`${item[fieldIndex]}.${rowIndex}`}
                    className={clsx({
                      [styles['active_col']]: getSelectedState(col.object.id)
                    })}
                    style={{ ...col.cells.styles }}
                  >
                    {item[fieldIndex]}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  function renderCrossTable() {
    if (
      structureItem?.rows.length === 0 ||
      structureItem?.columns.length === 0 ||
      structureItem?.values.length === 0
    ) {
      return null;
    }

    const crossData = getCrossTableData(
      structureItem?.rows[0],
      structureItem?.columns[0]
    );
    const res = getGrouppedTableData(
      structureItem?.rows[0],
      structureItem?.columns[0],
      structureItem?.values[0]
    );

    console.log(crossData);
    console.log(res);

    return (
      <table style={{ ...blockStyles }}>
        <thead>
          {crossData?.columns?.map(col => (
            <>
              {/* <tr>
                <th />
                <th colSpan={col?.values?.length}>{col.name}</th>
              </tr> */}
              <tr>
                <th />
                {col?.values?.map(val => (
                  <th key={val} rowSpan={2}>{val}</th>
                ))}
              </tr>
                 
            </>
          ))}
        </thead>
        <tbody>
          {crossData?.rows?.map(row => (
            <>
              {/* <tr>
                <td>{row.name}</td>
              </tr> */}
              {row?.values?.map(rowVal => (
                <tr key={rowVal}>
                  <td>{rowVal}</td>
                  {crossData?.columns?.map(col => {
                    return col.values.map(it => (
                      <td>{res[rowVal] && res[rowVal][it]}</td>
                    ));
                  })}
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>
    );
  }

  function renderTable() {
    switch (structureItem?.variant) {
      case 'vertical':
        return renderVerticalTable();
      case 'horizontal':
        return renderHorizontalTable();
      case 'cross':
        return renderCrossTable();
      default:
        return null;
    }
  }

  return (
    <div
      className={styles['table-container']}
      ref={refContent}
      onDrop={handleDropObject}
      onDragOver={allowDrop}
    >
      {structureItem?.columns?.length === 0 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: '1px solid #cdcdcd',
            borderStyle: 'dashed'
          }}
        >
          <TableChartIcon />
          <span>Drop data</span>
        </div>
      )}
      {renderTable()}
    </div>
  );
}

DataTable.propTypes = {
  id: PropTypes.number,
  structureItem: PropTypes.object,
  onSelectColumnHead: PropTypes.func,
  blockStyles: PropTypes.object,
  refContent: PropTypes.any
};

export default DataTable;
