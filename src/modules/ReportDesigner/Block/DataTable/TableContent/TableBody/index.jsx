/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-array-index-key */
// import styles from './TableBody.module.scss';
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { find, findIndex } from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Preloader from '../../../../../../common/components/Preloader/Preloader';
import { getElementData } from '../../../../../../data/actions/newReportDesigner';
import { setFormattingElement } from '../../../../../../data/reducers/new_reportDesigner';
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
  const formattingElement = useSelector(
    state => state.app.reportDesigner?.reportsUi?.ui?.formattingElement
  );

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

  const handleClick = (zone, item) => {
    dispatch(setFormattingElement({ zone, item }));
  };

  const renderHTableHeader = colId => {
    return headerZone?.map(zone => {
      const headerField = find(zone?.cells, it => it.col === colId);

      return (
        headerField && (
          <th onClick={() => handleClick('headerZone', headerField)}>
            <Cell
              displayMode={displayMode}
              blockStyles={headerField.styles}
              structureItem={headerField}
              id={headerField.id}
              selected={
                formattingElement && formattingElement.id === headerField.id
              }
            />
          </th>
        )
      );
    });
  };
  const renderHTableFooter = colId => {
    return footerZone?.map(zone => {
      const footerField = find(zone?.cells, it => it.col === colId);

      return (
        footerField && (
          <th onClick={() => handleClick('footerZone', footerField)}>
            <Cell
              displayMode={displayMode}
              blockStyles={footerField.styles}
              structureItem={footerField}
              id={footerField.id}
              selected={
                formattingElement && formattingElement.id === footerField.id
              }
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
              <td onClick={() => handleClick('bodyZone', item)}>
                <Cell
                  displayMode={displayMode}
                  blockStyles={item.style}
                  structureItem={item}
                  id={item.id}
                  selected={
                    formattingElement && formattingElement.id === item.id
                  }
                />
              </td>
              {tableType === 'hTable' ? renderHTableFooter(item.col) : null}
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
              <td key={item.id} onClick={() => handleClick('bodyZone', item)}>
                <Cell
                  displayMode={displayMode}
                  blockStyles={item.style}
                  structureItem={item}
                  id={item.id}
                  selected={
                    formattingElement && formattingElement.id === item.id
                  }
                />
              </td>
            );
          })}
        </tr>
      );
    });
  };

  const renderData = () => {
    const getStyle = index => {
      return bodyZone?.[0].cells?.[index]
        ? bodyZone?.[0].cells?.[index].style
        : {};
    };

    return (
      response &&
      response?.data?.data?.map((item, idx) => {
        return (
          <tr key={item} data="data-row">
            {tableType === 'hTable' && renderHTableHeader(idx + 1)}
            {item.map((cell, columnIndex) => {
              return (
                <td key={cell} style={{ ...getStyle(columnIndex) }}>
                  {cell}
                </td>
              );
            })}
            {tableType === 'hTable' && renderHTableFooter(idx + 1)}
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
