/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { find } from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getElementData } from '../../../../../../data/actions/newReportDesigner';
import { setFormattingElement } from '../../../../../../data/reducers/new_reportDesigner';
import Cell from '../../../Cell';
import styles from './TableFooter.module.scss';
import {getZoneData} from '../helpers'
import { LoadingRow, renderRow, getStyleFn } from '../../helpers';


const TableFooter = ({
  data,
  displayMode,
  reportData,
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

  const callback = key => res => {
    setZoneData(prev => ({ ...prev, [key]: res?.data }));
    setZoneLoadingStatus({
      ...zoneLoadingStatus,
      [key]: false
    });
  };

  const resetFn = key => {
        setZoneData({ ...zoneData, [key]: null });
        setZoneLoadingStatus({ ...zoneLoadingStatus, [key]: true });
  }

  const isDataEmpty = () => Object.values(zoneData).filter(item => (item && item.length > 0)).length === 0
  
  const getRefreshStatus = () => {
    if(isDataEmpty()) return true
    return needRefresh
  }


  useEffect(() => {
    if (displayMode === 'Data') {
      if(getRefreshStatus() === false) return
      getZoneData({
        zones: data,
        dispatch,
        callback,
        resetFn
      })
    }
  }, [displayMode]);

  const handleClick = (zone, item) => {
    dispatch(setFormattingElement({ zone, item }));
  };

  const renderCells = () => {
    if (tableType === 'hTable') return null;

    if (tableType === 'xTable') {
      const headerZone = data.filter(item => item.hType === 'header');
      const bodyZone = data.filter(item => item.hType === 'body');
      const footerZone = data.filter(item => item.hType === 'footer');
      /* eslint-disable  jsx-a11y/no-noninteractive-element-interactions */
      return [...headerZone, ...bodyZone, ...footerZone].map(zone => {
        return (
          // <tr key={zone.id}>
          zone?.cells?.map(item => {
            return (
              <td key={item.id} onClick={() => handleClick('footerZone', item)}>
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
          })
          // </tr>
        );
      });
    }

    return data?.map(zone => {
      return (
        <tr key={zone.id}>
          {zone?.cells?.map(item => {
            return (
              <td key={item.id} onClick={() => handleClick('footerZone', item)}>
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

  const getStyle = getStyleFn(data)

  const orderList = ['HF', 'BF', 'FF'];

;

  const renderData = () => {
    if (tableType === 'hTable') return null;
   

    if(tableType === 'xTable') {
      return renderRow({zoneData, getStyle, orderList});
    }

 
    const items = Object.values(zoneData)[0]

    if(!zoneData || !items) return LoadingRow

    return (
      items?.map(item => {
        return (
          <tr key={item} data="data-row">
            {item.map((cell, idx) => {
              return (
                <td key={cell + idx} style={{ ...getStyle(idx, Object.keys(zoneData)[0]) }}>
                  {cell}
                </td>
              );
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
