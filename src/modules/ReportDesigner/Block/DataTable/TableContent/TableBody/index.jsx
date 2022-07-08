/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-array-index-key */
// import styles from './TableBody.module.scss';
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { find } from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setFormattingElement } from '../../../../../../data/reducers/new_reportDesigner';
import Cell from '../../../TableCell';

import { getZoneData } from '../helpers';
import { LoadingRow, renderRow, getStyleFn } from '../../helpers';

const TableBody = ({
  bodyZone,
  headerZone,
  footerZone,
  reportData,
  displayMode,
  variables,
  tableType,
  needRefresh,
  ...props
}) => {
  const dispatch = useDispatch();
  const [zoneData, setZoneData] = useState({});
  const [zoneLoadingStatus, setZoneLoadingStatus] = useState({});
  const formattingElement = useSelector(
    state => state.app.reportDesigner?.reportsUi?.ui?.formattingElement
  );

  const zones =
    tableType === 'vTable'
      ? bodyZone
      : [...headerZone, ...bodyZone, ...footerZone];

  const callback = key => res => {
    setZoneData(prev => ({ ...prev, [key]: res?.data }));
    setZoneLoadingStatus({
      ...zoneLoadingStatus,
      [key]: false
    });
  };

  const isDataEmpty = () => Object.values(zoneData).filter(item => (item && item.length > 0)).length === 0

  const getRefreshStatus = () => {
    if(isDataEmpty()) return true
    return needRefresh
  }

  useEffect(async () => {
    if (displayMode === 'Data') {
    
      if(getRefreshStatus() === false) return
      setZoneData({});

      const resetFn = key => {
        setZoneData({ ...zoneData, [key]: null });
        setZoneLoadingStatus({ ...zoneLoadingStatus, [key]: true });
      };

      getZoneData({
        zones,
        dispatch,
        callback,
        resetFn
      });
    }
  }, [displayMode, needRefresh]);

  const handleClick = item => dispatch(setFormattingElement({ item }));

  const renderHTableHeader = colId => {
    return headerZone?.map(zone => {
      const headerField = find(zone?.cells, it => it.col === colId);

      return (
        headerField && (
          <td onClick={() => handleClick(headerField)}>
            <Cell
              tableType={tableType}
              displayMode={displayMode}
              blockStyles={headerField.styles}
              structureItem={headerField}
              id={headerField.id}
              selected={
                formattingElement && formattingElement.id === headerField.id
              }
            />
          </td>
        )
      );
    });
  };
  const renderHTableFooter = colId => {
    return footerZone?.map(zone => {
      const footerField = find(zone?.cells, it => it.col === colId);

      return (
        footerField && (
          <td onClick={() => handleClick(footerField)}>
            <Cell
              tableType={tableType}
              displayMode={displayMode}
              blockStyles={footerField.styles}
              structureItem={footerField}
              id={footerField.id}
              selected={
                formattingElement && formattingElement.id === footerField.id
              }
            />
          </td>
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
              <td onClick={() => handleClick(item)}>
                <Cell
                  tableType={tableType}
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
              <td key={item.id} onClick={() => handleClick(item)}>
                <Cell
                  tableType={tableType}
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

  const renderXTableCells = () => {
    const xHeaderZone = bodyZone.filter(item => item.hType === 'header');
    const xBodyZone = bodyZone.filter(item => item.hType === 'body');
    const xFooterZone = bodyZone.filter(item => item.hType === 'footer');

    // console.log(xHeaderZone, xBodyZone, xFooterZone);

    return [...xHeaderZone, ...xBodyZone, ...xFooterZone].map(zone => {
      return zone?.cells?.map(item => {
        if (zone.hType === 'header') {
          return (
            <th key={item.id} onClick={() => handleClick(item)}>
              <Cell
                tableType={tableType}
                displayMode={displayMode}
                blockStyles={item.style}
                structureItem={item}
                id={item.id}
                selected={formattingElement && formattingElement.id === item.id}
              />
            </th>
          );
        }

        return (
          <td key={item.id} onClick={() => handleClick(item)}>
            <Cell
              tableType={tableType}
              displayMode={displayMode}
              blockStyles={item.style}
              structureItem={item}
              id={item.id}
              selected={formattingElement && formattingElement.id === item.id}
            />
          </td>
        );
      });
    });
  };

  const getStyle = getStyleFn(zones);

  const orderList = ['HB', 'BB', 'FB'];

  const renderVRow = () => {
    const bodyKey = Object.keys(zoneData).find(
      key => key[key.length - 1] === 'B'
    );

    if (!zoneData || !zoneData[bodyKey]) return LoadingRow;
    return zoneData?.[bodyKey]?.map(item => {
      return (
        <tr key={item} data="data-row">
          {item.map((cell, idx) => {
            return (
              <td
                key={cell + idx}
                style={{ ...getStyle(idx, Object.keys(zoneData)[0]) }}
              >
                {cell}
              </td>
            );
          })}
        </tr>
      );
    });
  };

  const renderHRow = () => {
    if (!zoneData) return null;

    const orderHList = ['H', 'B', 'F'];
    const presorted = Object.keys(zoneData);

    const dataKeys = presorted.reduce((acc, key) => {
      const keyIndex = orderHList.reduce((indexAcc, fragment, index) => {
        if (key[key.length - 1] === fragment) indexAcc = index;
        return indexAcc;
      }, -1);
      acc[keyIndex] = key;
      return acc;
    }, []);

    const anchor = zoneData[dataKeys[0]];

    const getRow = index => {
      return dataKeys.reduce((acc, key) => {
        const currentRow = zoneData?.[key];
        if (!currentRow) return acc;
        const rowData = currentRow[index] || [];
        acc.push(
          rowData.map((cell, cellIndex) =>
            key[key.length - 1] === 'H' ? (
              <th style={{ ...getStyle(index, key) }}>{cell}</th>
            ) : (
              <td style={{ ...getStyle(index, key) }}>{cell}</td>
            )
          )
        );
        return acc;
      }, []);
    };

    return (
      // rows
      /* eslint-disable react/no-array-index-key   */
      anchor?.map((row, rowIndex) => {
        return (
          <tr key={`${rowIndex}-tb-row`} data="data-row">
            {getRow(rowIndex)}
          </tr>
        );
      })
    );
  };

  const renderData = () => {
    switch (tableType) {
      case 'vTable':
        return renderVRow();
      case 'hTable':
        return renderHRow();
      case 'xTable':
        return renderRow({ zoneData, getStyle, orderList, zoneLoadingStatus });
      default:
        return null;
    }
  };

  const renderCells = () => {
    switch (tableType) {
      case 'vTable':
        return renderVTableCells();
      case 'hTable':
        return renderHTableCells();
      case 'xTable':
        return renderXTableCells();
      default:
        return null;
    }
  };

  return <tbody>{displayMode === 'Data' ? renderData() : renderCells()}</tbody>;
};

export default TableBody;
