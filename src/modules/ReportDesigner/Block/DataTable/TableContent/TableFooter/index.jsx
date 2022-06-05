/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { find } from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getElementData } from '../../../../../../data/actions/newReportDesigner';
import Cell from '../../../Cell';
import styles from './TableFooter.module.scss';

const TableFooter = ({ data, displayMode, reportData, tableType, ...props }) => {
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = useState(false);
  const [response, setResponse] = useState();

  useEffect(() => {
    if (displayMode === 'Data') {
      setIsFetching(true);
      dispatch(
        getElementData({ report_id: 'R1', element_id: data[0].id }, res => {
          setIsFetching(false);
          setResponse(res);
        })
      );
    }
  }, [displayMode]);

  const renderCells = () => {
    if (tableType === 'hTable') return null;
    return data?.map(zone => {
      console.log(zone?.cells, 'zone?.cells?');
      return (
        <tr>
          {zone?.cells?.map(item => {
            return (
              <th key={item.id}>
                <Cell
                  displayMode={displayMode}
                  blockStyles={item.styles}
                  structureItem={item}
                  id={item.id}
                />
              </th>
            );
          })}
        </tr>
      );
    });
  };

  const renderData = () => {
    return (
      response &&
      response.data.data.map(item => {
        return (
          <tr key={item} data="data-row">
            {item.map((cell, idx) => {
              return <th key={cell + idx}>{cell}</th>;
            })}
          </tr>
        );
      })
    );
  };

  return (
    <tfoot className={styles.root}>
      {displayMode === 'Data' ? renderData() : renderCells()}
    </tfoot>
  );
};

export default TableFooter;
