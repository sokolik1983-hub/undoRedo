/* eslint-disable react/no-array-index-key */
// import styles from './TableBody.module.scss';
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { find, findIndex } from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Preloader from '../../../../../../common/components/Preloader/Preloader';
import { getElementData } from '../../../../../../data/actions/newReportDesigner';
import Cell from '../../../Cell';
import styles from './TableBody.module.scss';

const TableBody = ({ data, reportData, displayMode, variables, ...props }) => {
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

  const { dpData, dpObjects } = reportData;

  const renderCells = () => {
    return data?.map(zone => {
      return (
        <tr>
          {zone?.cells?.map(item => {
            return (
              <td key={item.id}>
                <Cell
                  displayMode={displayMode}
                  blockStyles={item.styles}
                  structureItem={item}
                  id={item.id}
                />
              </td>
            );
          })}
        </tr>
      );
    });
  };

  const renderData = () => {
    return dpData?.map(row => {
      return (
        <tr key={row} data="data-row">
          {data?.[0].cells?.map(item => {
            // TODO изменить на массив после обработки
            const expressionObjectIndex = findIndex(dpObjects, it => {
              if (item.expression?.variable_id)
                return item.expression?.variable_id.indexOf(it.id) > -1;
              if (item.expression?.id)
                return item.expression?.id.indexOf(it.id) > -1;

              return 0;
            });
            return (
              <td key={item.id}>
                {expressionObjectIndex && row[expressionObjectIndex + 1]}
              </td>
            );
          })}
        </tr>
      );
    });
  };

  return (
    <tbody>
      {isFetching && (
        <div className={styles.loader}>
          <Preloader />
        </div>
      )}
      {!isFetching && displayMode === 'Data' ? renderData() : renderCells()}
    </tbody>
  );
};

export default TableBody;
