/*eslint-disable */

import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { cloneDeep, find } from 'lodash';
import { getCurrentReport } from '../../helpers';
import {
  setFormattingElement,
  addTableColumn
} from '../../../../data/reducers/new_reportDesigner';
import { setReportStructure } from '../../../../data/actions/newReportDesigner';

import * as dropHelpers from './helpers';

const Cell = ({
  id,
  structureItem,
  blockStyles,
  displayMode = 'Structure',
  selected = false,
  independent = false,
  originalItem = {}
}) => {
  const dispatch = useDispatch();

  const reportDesigner = useSelector(state => state.app.reportDesigner);
  const currentReport = getCurrentReport(
    reportDesigner.reportsData.present.reports,
    reportDesigner.reportsData.present.activeReport
  );

  const [dragStatus, setDragStatus] = useState({
    left: false,
    top: false,
    right: false,
    bottom: false,
    center: false
  });

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
      below: dropHelpers.handleAddBelow
    };
    const { type, dataType, formula, parsedFormula, id } = payload
    const modified = mapper[position]({
      structure,
      target,
      payload: {type, dataType, formula, parsedFormula, variable_id:id }
    });

    // const element = {
    //   id: Date.now(),
    //   row: 1,
    //   col: 4,
    //   size: {},
    //   style: {},
    //   expression: {}
    // };

    // const activeNode =
    //   reportDesigner.reportsData.present.activeNodes &&
    //   reportDesigner.reportsData.present.activeNodes[0];

    // const currentNode = find(
    //   newStructureReport?.structure?.pgBody?.content?.children,
    //   item => item.id === activeNode?.id
    // );
    // const headerZone = currentNode?.content?.layout?.zones?.filter(
    //   item => item.vType === 'header'
    // );
    // const bodyZone = currentNode?.content?.layout?.zones?.filter(
    //   item => item.vType === 'body'
    // );

    // if (headerZone && headerZone.length > 0) {
    //   headerZone[0].cells = [
    //     ...headerZone[0].cells,
    //     {
    //       ...element,
    //       expression: {
    //         dataType: selectedEl.dataType,
    //         formula: selectedEl.name
    //       }
    //     }
    //   ];
    // }
    // if (bodyZone && bodyZone.length > 0) {
    //   bodyZone[0].cells = [
    //     ...bodyZone[0].cells,
    //     {
    //       ...element,
    //       expression: {
    //         dataType: selectedEl.dataType,
    //         formula: selectedEl.formula,
    //         parsedFormula: selectedEl.parsedFormula,
    //         type: selectedEl.type,
    //         variable_id: selectedEl.id
    //       }
    //     }
    //   ];
    // }

    dispatch(
      setReportStructure({
        report_id: 'R1',
        structure: modified.structure
      })
    );

    // dispatch(
    //   addTableColumn({
    //     object: { ...element, expression: { variable_id: selectedEl.id,  type: selectedEl.type, formula: selectedEl.formula,
    //       parsedFormula: selectedEl.parsedFormula,} },
    //     id,
    //     position
    //   })
    // );
  };

  const getCellStyle = () => {
    const result = {};
    return { ...blockStyles, ...result };
  };

  const getValueFromDS = () => {
    if (structureItem?.expression?.type === 'Const') {
      return structureItem?.expression?.formula;
    }

    // console.log(response, 'response');

    return '-';
  };

  const getCellValue =
    displayMode === 'Structure'
      ? `${structureItem?.expression?.formula || ''}`
      : getValueFromDS(structureItem);

  return (
    <div
      style={{
        position: 'relative',
        ...getCellStyle(),
        outline: selected ? 'solid 1px blue' : 'none'
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

      <div
        style={{
          ...getCellStyle()
        }}
      >
        {getCellValue}
      </div>
    </div>
  );
};

Cell.propTypes = {
  id: [PropTypes.string, PropTypes.number],
  structureItem: PropTypes.object,
  blockStyles: PropTypes.object,
  displayMode: PropTypes.string,
  selected: PropTypes.bool,
  independent: PropTypes.bool,
  originalItem: PropTypes.object
};

export default Cell;
