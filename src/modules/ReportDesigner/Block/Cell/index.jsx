/*eslint-disable */

import { cloneDeep, find } from 'lodash';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setReportStructure } from '../../../../data/reportDesigner/reportsData/reportsDataActions';
import { setFormattingElement } from '../../../../data/reportDesigner/reportsUi/reportDesignerUIReducer';
import { getCurrentReport } from '../../helpers';
import * as dropHelpers from './helpers';

const Cell = ({
  id,
  structureItem,
  blockStyles,
  displayMode = 'Structure',
  selected = false,
  independent = false,
  originalItem = {},
}) => {
  const dispatch = useDispatch();
  const reportDesigner = useSelector((state) => state.app.reportDesigner);
  const currentReport = getCurrentReport(
    reportDesigner.reportsData.present.reports,
    reportDesigner.reportsData.present.activeReport,
  );

  const [dragStatus, setDragStatus] = useState({
    left: false,
    top: false,
    right: false,
    bottom: false,
    center: false,
  });

  const handleDragOver = (e) => {
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
      center: false,
    };

    defaultObj[position] = true;

    setDragStatus(defaultObj);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragStatus({
      left: false,
      top: false,
      right: false,
      bottom: false,
      center: false,
    });
  };

  const handleClick = () =>
    dispatch(setFormattingElement({ item: originalItem }));

  const handleDrop = (event, position) => {
    const payload = JSON.parse(event.dataTransfer.getData('text'));
    event.dataTransfer.clearData();
    setDragStatus(false);

    const target = structureItem;

    const structure = cloneDeep(currentReport);

    const mapper = {
      before: dropHelpers.handleAddBefore,
      after: dropHelpers.handleAddAfter,
      center: dropHelpers.handleReplace,
      above: dropHelpers.handleAddAbove,
      below: dropHelpers.handleAddBelow,
    };
    const { type, dataType, formula, parsedFormula, id, name } = payload;
    const modified = mapper[position]({
      structure,
      target,
      payload: {
        type,
        dataType,
        formula,
        parsedFormula,
        variable_id: id,
        name,
      },
    });

    dispatch(
      setReportStructure({
        report_id: currentReport.id,
        structure: modified.structure,
      }),
    );
  };

  const getCellStyle = () => {
    const result = {
      minHeight: '30px',
      minWidth: '100px',
      // maxWidth: '150px'
    };
    return { ...blockStyles, ...result };
  };

  const getValueFromDS = () => {
    if (structureItem?.expression?.type === 'Const') {
      return structureItem?.expression?.formula;
    }
    return '-';
  };

  const getCellValue =
    displayMode === 'Structure'
      ? `${structureItem?.expression?.formula || ''}`
      : getValueFromDS();

  return (
    <div
      style={{
        position: 'relative',
        ...getCellStyle(),
        outline: selected ? 'solid 1px blue' : 'none',
      }}
      onDragOver={handleDragOver}
      onClick={independent ? handleClick : () => {}}
    >
      <div
        style={{
          position: 'absolute',
          left: '0px',
          top: '0px',
          width: '10px',
          height: '100%',
        }}
        onDragEnter={(e) => handleDragEnter(e, 'left')}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'before')}
      >
        <div
          onDragLeave={handleDragLeave}
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(124,124,255,0.5)',
            visibility: dragStatus.left ? 'visible' : 'hidden',
          }}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          left: '0px',
          top: '0px',
          width: '100%',
          height: '10px',
        }}
        onDragEnter={(e) => handleDragEnter(e, 'top')}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'above')}
      >
        <div
          onDragLeave={handleDragLeave}
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(124,124,255,0.5)',
            visibility: dragStatus.top ? 'visible' : 'hidden',
          }}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          right: '25%',
          top: '25%',
          width: '50%',
          height: 'calc(100% - 20px)',
        }}
        onDragEnter={(e) => handleDragEnter(e, 'center')}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'center')}
      >
        <div
          onDragLeave={handleDragLeave}
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(124,124,255,0.5)',
            visibility: dragStatus.center ? 'visible' : 'hidden',
          }}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          right: '0px',
          top: '0px',
          width: '10px',
          height: '100%',
        }}
        onDragEnter={(e) => handleDragEnter(e, 'right')}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'after')}
      >
        <div
          onDragLeave={handleDragLeave}
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(124,124,255,0.5)',
            visibility: dragStatus.right ? 'visible' : 'hidden',
          }}
        />
      </div>

      <div
        style={{
          ...getCellStyle(),
        }}
      >
        {getCellValue}
      </div>
    </div>
  );
};

Cell.propTypes = {
  id: PropTypes.string,
  structureItem: PropTypes.object,
  blockStyles: PropTypes.object,
  displayMode: PropTypes.string,
  selected: PropTypes.bool,
  independent: PropTypes.bool,
  originalItem: PropTypes.object,
};

export default Cell;
