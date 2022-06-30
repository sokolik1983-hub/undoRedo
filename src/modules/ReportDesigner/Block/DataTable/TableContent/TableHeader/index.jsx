/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import cloneDeep from 'lodash/cloneDeep';

import { find } from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getElementData } from '../../../../../../data/actions/newReportDesigner';
import { setFormattingElement } from '../../../../../../data/reducers/new_reportDesigner';
import Cell from '../../../TableCell';
import styles from './TableHeader.module.scss';
import {getZoneData, selectCell} from '../helpers'
import { LoadingRow, renderRow, getStyleFn } from '../../helpers';

const TableHeader = ({
  data,
  displayMode,
  reportData,
  tableType,
  ...props
}) => {
  const dispatch = useDispatch();
  const [zoneData, setZoneData] = useState({});
  const [zoneLoadingStatus, setZoneLoadingStatus] = useState({});

  const [isFetching, setIsFetching] = useState(false);
  const [response, setResponse] = useState();
  const formattingElement = useSelector(
    state => state.app.reportDesigner?.reportsUi?.ui?.formattingElement
  );

  const callback = key => (res) => {
    setZoneData(prev => ({ ...prev, [key]: res?.data }));
    setZoneLoadingStatus({
      ...zoneLoadingStatus,
      [key]: false
    });
  }

  const resetFn = key => {
    setZoneData({ ...zoneData, [key]: null });
    setZoneLoadingStatus({ ...zoneLoadingStatus, [key]: true });
}

  const zones = data


  useEffect(() => {
    if (displayMode === 'Data') {
      getZoneData({
        zones,
        dispatch,
        callback,
        resetFn
      })
    }
  }, [displayMode]);

  if (tableType === 'hTable') return null;

  const handleClick = selectCell(dispatch)

  const getStyle = getStyleFn(data)

  const orderList = ['HH', 'BH', 'FH'];
  
  const renderData = () => {
    if (tableType === 'hTable') return null;

    if (tableType === 'xTable') {
      return renderRow({zoneData, getStyle, orderList});
    }

    const items = Object.values(zoneData)[0]
    if(!zoneData || !items) return LoadingRow
/* eslint-disable react/no-array-index-key   */
    return (
      items?.map(item => {
        return (
          <tr key={item} data="data-row">
            {item.map((cell, idx) => {
              return (
                <th key={cell + idx} style={{ ...getStyle(idx, Object.keys(zoneData)[0]) }}>
                  {cell}
                </th>
              );
            })}
          </tr>
        );
      })
    );
  };

  const renderCells = () => {
    if (tableType === 'hTable') return null;

    if (tableType === 'xTable') {
      const headerZone = data.filter(item => item.hType === 'header');
      const bodyZone = data.filter(item => item.hType === 'body');
      const footerZone = data.filter(item => item.hType === 'footer');

      return [...headerZone, ...bodyZone, ...footerZone].map(zone => {
        return (
          // <tr key={zone.id}>
          zone?.cells?.map(item => {
            return (
              <th key={item.id} onClick={() => handleClick(item)}>
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
              </th>
            );
          })
          // </tr>
        );
      });
    }

    return data?.map(zone => {
      return (
        <tr>
          {zone?.cells?.map(item => {
            return (
              <th key={item.id} onClick={() => handleClick(item)}>
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
              </th>
            );
          })}
        </tr>
      );
    });
  };

  return (
    <tbody>
      {!isFetching && displayMode === 'Data' ? renderData() : renderCells()}
    </tbody>
  );
};

export default TableHeader;
