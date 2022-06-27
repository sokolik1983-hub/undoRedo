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
import {getZoneData} from '../helpers'


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
  const [zoneData, setZoneData] = useState({});
  const [zoneLoadingStatus, setZoneLoadingStatus] = useState({});

  // const [isFetching, setIsFetching] = useState(false);
  // const [response, setResponse] = useState();
  const formattingElement = useSelector(
    state => state.app.reportDesigner?.reportsUi?.ui?.formattingElement
  );

  // useEffect(() => {
  //   if (displayMode === 'Data') {
  //     setIsFetching(true);
  //     dispatch(
  //       getElementData({ report_id: 'R1', element_id: bodyZone[0].id }, res => {
  //         setIsFetching(false);
  //         setResponse(res);
  //       })
  //     );
  //   }
  // }, [displayMode]);

  const callback = key => res => {
    setZoneData(prev => ({ ...prev, [key]: res?.data }));
    setZoneLoadingStatus({
      ...zoneLoadingStatus,
      [key]: false
    });
  };

  useEffect(async () => {
    if (displayMode === 'Data') {
      setZoneData({});
      const zones =
        tableType === 'vTable'
          ? bodyZone
          : [...headerZone, ...bodyZone, ...footerZone];

          const resetFn = key => {
            setZoneData({ ...zoneData, [key]: null });
            setZoneLoadingStatus({ ...zoneLoadingStatus, [key]: true });
      }

      getZoneData({
        zones,
        dispatch,
        callback,
        resetFn
      })
    }
  }, [displayMode]);

  const handleClick = (item) => dispatch(setFormattingElement({ item }));
  

  const renderHTableHeader = colId => {
    return headerZone?.map(zone => {
      const headerField = find(zone?.cells, it => it.col === colId);

      return (
        headerField && (
          <th onClick={() => handleClick(headerField)}>
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
          <td onClick={() => handleClick(footerField)}>
            <Cell
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

  // const getStyle = (zone, id) => {

  // }

  const getStyle = (index, key) => {
    if(!key) {
      return bodyZone?.[0].cells?.[index]
      ? bodyZone?.[0].cells?.[index].style
      : {};
    }

    const targetZone = [...bodyZone, ...footerZone, ...headerZone].find(zone => (zone.id === key))
     
    return targetZone?.cells?.[index]
    ? targetZone?.cells?.[index].style
    : {};
  
   
  };

  const renderRow = () => {
    if (!zoneData) return null;

    const orderList = ['HB', 'BB', 'FB'];
    const presorted = Object.keys(zoneData);

    const dataKeys = presorted.reduce((acc, key) => {
      const keyIndex = orderList.reduce((indexAcc, fragment, index) => {
        if (key.indexOf(fragment) > -1) indexAcc = index;
        return indexAcc;
      }, -1);
      acc[keyIndex] = key;
      return acc;
    }, []);

    const getRow = index => {
      // console.log(zoneData?.[dataKeys[0]][index])
      // return [ ...zoneData?.[dataKeys[0]][index] ]

      return dataKeys.reduce((acc, key) => {
        const currentRow = zoneData?.[key];
        if (!currentRow) return acc;
        const rowData = currentRow[index] || [];
        acc.push(
          rowData.map((cell, cellIndex) =>
            key.indexOf('HB') > -1 ? <th style={{ ...getStyle(index, key) }}>{cell}</th> : <td style={{ ...getStyle(index, key) }}>{cell}</td>
          )
        );
        return acc;
      }, []);
    };

    const getId = (index, key) => `header-${key}-${index}`;
    const anchorArray = zoneData?.[dataKeys[0]];
    if (!anchorArray || anchorArray.length === 0) return null;
    return anchorArray.map((item, index) => <tr>{getRow(index)}</tr>);

    // return dataKeys.map(key => (
    //   <tr>
    //     {zoneData?.[key]?.map(item =>
    //       item.map((cell, index) => (
    //         <td key={getId(index, key)} style={{ ...getStyle(index) }}>
    //           {cell}
    //         </td>
    //       ))
    //     )}
    //   </tr>
    // ));
  };

  const renderVRow = () => {
    // const orderList = ['.H', '.B', '.F'];
    // const presorted = Object.keys(zoneData);

    // const dataKeys = presorted.reduce((acc, key) => {
    //   const keyIndex = orderList.reduce((indexAcc, fragment, index) => {
    //     if (key.indexOf(fragment) > -1) indexAcc = index;
    //     return indexAcc;
    //   }, -1);
    //   acc[keyIndex] = key;
    //   return acc;
    // }, []);

    const bodyKey = Object.keys(zoneData).find(
      key => key[key.length - 1] === 'B'
    );

    return zoneData?.[bodyKey]?.map(item => {
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
    });
  };

  const renderHRow = () => {
    if (!zoneData) return null;

    const orderList = ['H', 'B', 'F'];
    const presorted = Object.keys(zoneData);

    const dataKeys = presorted.reduce((acc, key) => {
      const keyIndex = orderList.reduce((indexAcc, fragment, index) => {
        if (key[key.length - 1] === fragment) indexAcc = index;
        return indexAcc;
      }, -1);
      acc[keyIndex] = key;
      return acc;
    }, []);

    const anchor = zoneData[dataKeys[0]];

    const getRow = index => {
      // console.log(zoneData?.[dataKeys[0]][index])
      // return [ ...zoneData?.[dataKeys[0]][index] ]

      return dataKeys.reduce((acc, key) => {
        const currentRow = zoneData?.[key];
        if (!currentRow) return acc;
        const rowData = currentRow[index] || [];
        acc.push(
          rowData.map(cell =>
            key[key.length - 1] === 'H' ? <th>{cell}</th> : <td>{cell}</td>
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
        return renderRow();
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

  return (
    <tbody>
      {displayMode === 'Data' ? renderData() : renderCells()}
      {/* {isFetching && (
        <div className={styles.loader}>
          <Preloader />
        </div>
      )}
      {!isFetching && displayMode === 'Data' ? renderData() : renderCells()} */}
    </tbody>
  );
};

export default TableBody;
