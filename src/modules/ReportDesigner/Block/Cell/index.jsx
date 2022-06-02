/*eslint-disable */

import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

const mockCell = {
  id: 'R1.B.1',
  type: 'cell',
  name: 'ячейка 1',
  size: {
    minimalHeight: 60,
    minimalWidth: 120,
    autofitWidth: false,
    autofitHeight: false
  },
  position: {
    xType: 'Absolute',
    yType: 'Absolute',
    x: 20,
    y: 10
  },
  style: {},
  content: {
    expression: {
      type: 'Const',
      dataType: 'String',
      formula: 'Название отчета'
    }
  }
};

const Cell = ({
  id,
  structureItem,
  blockStyles,
  refContent,
  displayMode = 'structure'
}) => {
  // const dispatch = useDispatch();
  // const reportsUi = useSelector(state => state.app.reportDesigner.reportsUi.ui);
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
    // dispatch(
    //   addTableColumn({
    //     column: { ...columnObject, object: { ...selectedEl } },
    //     id
    //   })
    // );
  };

  const getCellStyle = () => {
    const result = {};

    if (blockStyles?.font) {
      if (blockStyles?.font?.size) {
        result['fontSize'] = blockStyles?.font?.size + 'px';
      }
    }
    // const {
    //   minimalHeight = 60,
    //   minimalWidth = 120,
    //   autofitWidth = false, // после уточнения
    //   autofitHeight = false // после уточнения
    // } = size;

    // result['minWidth'] = minimalWidth + 'px';
    // result['minHeight'] = minimalHeight + 'px';

    return { ...blockStyles, ...result };
  };

  const getCellValue =
    displayMode === 'structure'
      ? `${structureItem?.expression?.formula}`
      : 'Значение из БД';

  return (
    <div
      style={{ position: 'relative', ...getCellStyle() }}
     
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
          height: '50%',
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
