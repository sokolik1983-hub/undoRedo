/*eslint-disable */

import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

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

const Cell = ({ id, structureItem, blockStyles, refContent, displayMode = 'structure' }) => {
  // const dispatch = useDispatch();
  // const reportsUi = useSelector(state => state.app.reportDesigner.reportsUi.ui);
 

  const { size, style } = structureItem;



  const getCellStyle = () => {
    const result = {};
    console.log('blockStyles',blockStyles)
    if(blockStyles?.font) {
        if(blockStyles?.font?.size) {
          result['fontSize'] = blockStyles?.font?.size +  'px'
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

    return ({ ...blockStyles, ...result });
  };
 
  const getCellValue = displayMode === 'structure' ? `${structureItem?.expression?.formula}` : 'Значение из БД'
  console.log(getCellStyle())
  return <div style={getCellStyle()}>{getCellValue}</div>;
};

Cell.propTypes = {
  id: PropTypes.number,
  structureItem: PropTypes.object,
  blockStyles: PropTypes.object,
  refContent: PropTypes.any
};

export default Cell;
