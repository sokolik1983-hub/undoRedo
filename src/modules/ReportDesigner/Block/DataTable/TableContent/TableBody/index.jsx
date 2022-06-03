/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
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

const TableBody = ({
  bodyZone,
  headerZone,
  footerZone,
  reportData,
  displayMode,
  variables,
  tableType,
  ...props
}) => {
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = useState(false);
  const [response, setResponse] = useState();

  useEffect(() => {
    if (displayMode === 'Data') {
      setIsFetching(true);
      dispatch(
        getElementData({ report_id: 'R1', element_id: bodyZone[0].id }, res => {
          setIsFetching(false);
          setResponse(res);
        })
      );
    }
  }, [displayMode]);

  const renderHTableHeader = colId => {
    return headerZone?.map(zone => {
      const headerField = find(zone?.cells, it => it.col === colId);

      return (
        headerField && (
          <th>
            <Cell
              displayMode={displayMode}
              blockStyles={headerField.styles}
              structureItem={headerField}
              id={headerField.id}
            />
          </th>
        )
      );
    });
  };
  const renderHTableFooter = colId => {
    return footerZone?.map(zone => {
      const headerField = find(zone?.cells, it => it.col === colId);

      return (
        headerField && (
          <th>
            <Cell
              displayMode={displayMode}
              blockStyles={headerField.styles}
              structureItem={headerField}
              id={headerField.id}
            />
          </th>
        )
      );
    });
  };

  const renderHTableCells = () => {
    return bodyZone?.map(zone => {
      return [
        zone?.cells?.map((item, idx) => {
          return (
            <tr key={item.id}>
              {tableType === 'hTable' ? renderHTableHeader(item.col) : null}
              <td>
                <Cell
                  displayMode={displayMode}
                  blockStyles={item.styles}
                  structureItem={item}
                  id={item.id}
                />
              </td>
            </tr>
          );
        })
      ];
    });
  };

  const renderVTableCells = () => {
    return bodyZone?.map(zone => {
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
      response.data.data.map((item, idx) => {
        return (
          <tr key={item} data="data-row">
            {tableType === 'hTable' && renderHTableHeader(idx + 1)}
            {item.map(cell => {
              return <td key={cell}>{cell}</td>;
            })}
          </tr>
        );
      })
    );
  };

  const renderCells = () => {
    switch (tableType) {
      case 'vTable':
        return renderVTableCells();
      case 'hTable':
        return renderHTableCells();
      default:
        return null;
    }
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
