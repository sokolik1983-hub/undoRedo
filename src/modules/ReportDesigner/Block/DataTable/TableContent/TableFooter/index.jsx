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


const TableFooter = ({
  data,
  displayMode,
  reportData,
  tableType,
  ...props
}) => {
  const dispatch = useDispatch();
  const [zoneData, setZoneData] = useState({});
  const [zoneLoadingStatus, setZoneLoadingStatus] = useState({});
  const formattingElement = useSelector(
    state => state.app.reportDesigner?.reportsUi?.ui?.formattingElement
  );

  const callback = key => res => {
    setZoneData(prev => ({ ...prev, [key]: res?.data?.data }));
    setZoneLoadingStatus({
      ...zoneLoadingStatus,
      [key]: false
    });
  };

  const resetFn = key => {
        setZoneData({ ...zoneData, [key]: null });
        setZoneLoadingStatus({ ...zoneLoadingStatus, [key]: true });
  }

  useEffect(() => {
    if (displayMode === 'Data') {
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

  const orderList = ['HF', 'BF', 'FF'];
  const presorted = Object.keys(zoneData);

  const dataKeys = presorted.reduce((acc, key) => {
    const keyIndex = orderList.reduce((indexAcc, fragment, index) => {
      if (key.indexOf(fragment) > -1) indexAcc = index;
      return indexAcc;
    }, -1);
    acc[keyIndex] = key;
    return acc;
  }, []);


  const renderRow = () => {
    if (!zoneData) return null;

   

    const getRow = index => {
      // console.log(zoneData?.[dataKeys[0]][index])
      // return [ ...zoneData?.[dataKeys[0]][index] ]

      return dataKeys.reduce((acc, key) => {
        const currentRow = zoneData?.[key];
        if (!currentRow) return acc;
        const rowData = currentRow[index] || [];
        acc.push(
          rowData.map(cell =>
            key.indexOf('HF') > -1 ? <th>{cell}</th> : <td>{cell}</td>
          )
        );
        return acc;
      }, []);
    };

    const getId = (index, key) => `header-${key}-${index}`;
    const anchorArray = zoneData?.[dataKeys[0]];
    if (!anchorArray || anchorArray.length === 0) return null;
    return anchorArray.map((item, index) => <tr>{getRow(index)}</tr>);
  };


  const renderData = () => {
    if (tableType === 'hTable') return null;
    const getStyle = index => {
      return data?.[0].cells?.[index] ? data?.[0].cells?.[index].style : {};
    };

    if(tableType === 'xTable') {
      return renderRow();
    }

 
    const items = Object.values(zoneData)[0]


    return (
      items?.map(item => {
        return (
          <tr key={item} data="data-row">
            {item.map((cell, idx) => {
              return (
                <td key={cell + idx} style={{ ...getStyle(idx) }}>
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
