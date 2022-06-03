/*eslint-disable */

import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { find, findIndex } from 'lodash';
import { getCurrentReport } from '../../helpers';
import { addTableColumn } from '../../../../data/reducers/new_reportDesigner';

// const mockCell = {
//   id: 'R1.B.1',
//   type: 'cell',
//   name: 'ячейка 1',
//   size: {
//     minimalHeight: 60,
//     minimalWidth: 120,
//     autofitWidth: false,
//     autofitHeight: false
//   },
//   position: {
//     xType: 'Absolute',
//     yType: 'Absolute',
//     x: 20,
//     y: 10
//   },
//   style: {},
//   content: {
//     expression: {
//       type: 'Const',
//       dataType: 'String',
//       formula: 'Название отчета'
//     }
//   }
// };

const Cell = ({
  id,
  structureItem,
  blockStyles,
  refContent,
  displayMode = 'Structure',
  selected = false
}) => {
  const dispatch = useDispatch();
  // const reportsUi = useSelector(state => state.app.reportDesigner.reportsUi.ui);
  const reportInformation = useSelector(
    state => state.app.reportDesigner.reportsData.present
  );
  const reportDesigner = useSelector(state => state.app.reportDesigner);
  const currentReport = getCurrentReport(
    reportDesigner.reportsData.present.reports,
    reportDesigner.reportsData.present.activeReport
  );
  const dataSource =
    reportInformation?.data?.dps && reportInformation?.data?.dps[0];
  const dpData = dataSource?.dpData;
  const dpObjects = dataSource?.dpObjects;

  const [dragStatus, setDragStatus] = useState({
    left: false,
    top: false,
    right: false,
    bottom: false,
    center: false
  });

  const { size, style } = structureItem;

  const handleDragOver = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e, position) => {
    e.preventDefault();
    e.stopPropagation();

    const defaultObj = {
      left: false,
      top: false,
      right: false,
      bottom: false,
      center: false
    };

    defaultObj[position] = true;

    setDragStatus(defaultObj);
  };

  const handleDragLeave = e => {
    e.preventDefault();
    e.stopPropagation();
    setDragStatus({
      left: false,
      top: false,
      right: false,
      bottom: false,
      center: false
    });
  };

  const handleDrop = (event, position) => {
    const selectedEl = JSON.parse(event.dataTransfer.getData('text'));
    event.dataTransfer.clearData();

    console.log(position, id, selectedEl);
    setDragStatus(false);

    const activeNode =
      reportDesigner.reportsData.present.activeNodes &&
      reportDesigner.reportsData.present.activeNodes[0];
    const currentNode = find(
      currentReport?.structure?.pgBody?.content?.children,
      item => item.id === activeNode?.id
    );
    const headerZone = currentNode?.content?.layout?.zones?.filter(
      item => item.vType === 'header'
    );
    const bodyZone = currentNode?.content?.layout?.zones?.filter(
      item => item.vType === 'body'
    );

    const element = {
      id: 1,
      row: 1,
      col: 1,
      size: {},
      style: {},
      expression: {
        dataType: 'String',
        formula: '=[Тип учредителя]',
        parsedFormula: '=[DP0.D2]',
        type: 'Dimension',
        variable_id: 'DP0.D2'
      }
    };
    debugger;
    // bodyZone?.[0].cells.push(element);

    dispatch(
      addTableColumn({
        // column: { },
        // column: { ...columnObject, object: { ...selectedEl } },
        object: { ...element, expression: { ...selectedEl } },
        id
      })
    );
  };

  const getCellStyle = () => {
    const result = {};
    return { ...blockStyles, ...result };
  };

  const getValueFromDS = structureItem => {
    if (structureItem?.expression?.type === 'Const') {
      return structureItem?.expression?.formula;
    }

    return '-';
  };

  const getCellValue =
    displayMode === 'Structure'
      ? `${structureItem?.expression?.formula}`
      : getValueFromDS(structureItem); //'Значение из БД';

  return (
    <div
      style={{ position: 'relative', ...getCellStyle(), outline: selected ? 'solid 1px blue' : "none" }}
      // onDragOver={handleDragOver}
    >
      <div
        style={{
          position: 'absolute',
          left: '0px',
          top: '0px',
          width: '10px',
          height: '100%'
        }}
        onDragEnter={e => handleDragEnter(e, 'left')}
        onDragOver={handleDragOver}
        onDrop={e => handleDrop(e, 'before')}
      >
        <div
          onDragLeave={handleDragLeave}
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(124,124,255,0.5)',
            visibility: dragStatus.left ? 'visible' : 'hidden'
          }}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          right: '25%',
          top: '25%',
          width: '50%',
          height: '50%'
        }}
        onDragEnter={e => handleDragEnter(e, 'center')}
        onDragOver={handleDragOver}
        onDrop={e => handleDrop(e, 'center')}
      >
        <div
          onDragLeave={handleDragLeave}
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(124,124,255,0.5)',
            visibility: dragStatus.center ? 'visible' : 'hidden'
          }}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          right: '0px',
          top: '0px',
          width: '10px',
          height: '100%'
        }}
        onDragEnter={e => handleDragEnter(e, 'right')}
        onDragOver={handleDragOver}
        onDrop={e => handleDrop(e, 'after')}
      >
        <div
          onDragLeave={handleDragLeave}
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(124,124,255,0.5)',
            visibility: dragStatus.right ? 'visible' : 'hidden'
          }}
        />
      </div>

      {/* <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          visibility: dragStatus ? 'visible' : 'hidden',
          backgroundColor: 'rgba(255,255,255,0.1)'
        }}
     
        onDragOver={handleDragOver}
      >
        <div
          onDrop={e => handleDrop(e, 'before')}
          onDragOver={handleDragOver}
          style={{
            position: 'absolute',
            left: '0px',
            top: '0px',
            width: '10px',
            height: '100%',
            backgroundColor: 'rgba(124,124,255,0.5)'
          }}
        />
        <div
          onDrop={e => handleDrop(e, 'above')}
          onDragOver={handleDragOver}
          style={{
            position: 'absolute',
            left: '20px',
            top: '0px',
            width: 'calc(100% - 40px)',
            height: '8px',
            backgroundColor: 'rgba(124,124,255,0.5)'
          }}
        />
        <div
          onDrop={e => handleDrop(e, 'after')}
          onDragOver={handleDragOver}
          style={{
            position: 'absolute',
            right: '0px',
            top: '0px',
            width: '10px',
            height: '100%',
            backgroundColor: 'rgba(124,124,255,0.5)'
          }}
        />
        <div
          onDrop={e => handleDrop(e, 'below')}
          onDragOver={handleDragOver}
          style={{
            position: 'absolute',
            left: '20px',
            bottom: '0px',
            width: 'calc(100% - 40px)',
            height: '8px',
            backgroundColor: 'rgba(124,124,255,0.5)'
          }}
        />
      </div> */}

      <div>{getCellValue}</div>
    </div>
  );
};

Cell.propTypes = {
  id: PropTypes.string,
  structureItem: PropTypes.object,
  blockStyles: PropTypes.object,
  refContent: PropTypes.any
};

export default Cell;
