/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import cloneDeep from 'lodash/cloneDeep';

import { find } from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getElementData } from '../../../../../../data/actions/newReportDesigner';
import { setFormattingElement } from '../../../../../../data/reducers/new_reportDesigner';
import Cell from '../../../Cell';
import styles from './TableHeader.module.scss';
import {getZoneData, selectCell} from '../helpers'


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

  const getStyle = (index, key) => {
    return data?.[0].cells?.[index] ? data?.[0].cells?.[index].style : {};
  };

  const renderRow = () => {
    if (!zoneData) return null;
    const orderList = ['HH', 'BH', 'FH']
    const presorted = Object.keys(zoneData)
    const dataKeys = presorted.reduce((acc,key) => {
      const keyIndex = orderList.reduce((indexAcc,fragment, index) => {
        if(key.indexOf(fragment) > -1) indexAcc = index
        return indexAcc
      }, -1)
      acc[keyIndex] = key
      return acc
    }, [])

  


    const getId = (index, key) => `header-${key}-${index}`;

    return (
      <tr>
        {dataKeys.map(key =>
          zoneData?.[key]?.map(item =>
            item.map((cell, index) => (
              <th key={getId(index, key)} style={{ ...getStyle(index) }}>
                {cell}
              </th>
            ))
          )
        )}
      </tr>
    );
  };

  const renderData = () => {
    if (tableType === 'hTable') return null;

    if (tableType === 'xTable') {
      return renderRow();
    }

    const items = Object.values(zoneData)[0]

/* eslint-disable react/no-array-index-key   */
    return (
      items?.map(item => {
        return (
          <tr key={item} data="data-row">
            {item.map((cell, idx) => {
              return (
                <th key={cell + idx} style={{ ...getStyle(idx) }}>
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
