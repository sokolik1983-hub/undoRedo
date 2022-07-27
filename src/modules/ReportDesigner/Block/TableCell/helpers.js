import uuid from 'react-uuid';

/* eslint-disable no-unused-vars, camelcase */
import { deepObjectSearch } from '../../../../data/helpers';

const defaultExpression = {
  dataType: 'String',
  formula: '',
  type: 'Const',
};

const makeCellObject = ({ parent, expression }) => {
  const obj = {
    id: `${parent.id}.${uuid()}`,
    col: 0,
    row: 0,
    style: {},
    expression: defaultExpression,
  };
  if (!expression) return obj;
  return {
    ...obj,
    expression,
  };
};

const getCrossElements = ({ zone, zones }) => {
  const hNeighbours = zones.filter((zoneItem) => zoneItem.hType === zone.hType);
  const vNeighbours = zones.filter((zoneItem) => zoneItem.vType === zone.vType);

  return { hNeighbours, vNeighbours };
};

/*
  target = ячейкa, куда дропнули
  targetIndex = индекс target внутри cells
  vNeighbours - все элементы внутри zones, у которых hType такой же как у зоны target
  hNeighbours - все элементы внутри zones, у которых vType такой же как у зоны target

  xCells - все ячейки внутри hNeighbours, у которых targetIndex такой же как у target

  ----------- Замена значения в существующей ---------------------

  ----------------------- hType: header --------------------------

  Если заменяем в зоне vType: header и hType: header:
  1. xCells, у которой индекс === targetIndex, vType === header формула - константа
  2. xCells, у которой индекс === targetIndex, vType === body. формула  - формула

  Если заменяем в зоне vType: body и hType: header:
  1. xCells, у которой индекс === targetIndex, vType === header формула - константа
  2. xCells, у которой индекс === targetIndex, vType === body. формула  - формула

  Если заменяем в зоне vType: footer и hType: header:
  1. xCells, у которой индекс === targetIndex, vType === footer. формула  - формула

  ----------------------- hType: body --------------------------

  Если заменяем в зоне vType: header и hType: body:
   1. xCells, у которой индекс === targetIndex, vType === header. формула  - формула

  Если заменяем в зоне vType: body и hType: body:
  1. xCells, у которой индекс === targetIndex, vType === body. формула  - формула

  Если заменяем в зоне vType: footer и hType: body:
  1. xCells, у которой индекс === targetIndex, vType === footer . формула  - формула


  ----------------------- hType: footer --------------------------

   Если заменяем в зоне vType: header и hType: footer:
   1. xCells, у которой индекс === targetIndex, vType === header . формула  - формула

  Если заменяем в зоне vType: body и hType: footer:
  1. xCells, у которой  индекс === targetIndex, vType === body . формула  - формула

  Если заменяем в зоне vType: footer и hType: footer:
  1. xCells, у которой индекс === targetIndex, vType === footer . формула  - формула

  ------------------- Добавление столбца --------------------------

  addIndexCoeff если направление 'before' то 0, если after то +1 
  newCellIndex = targetIndex + addIndexCoeff

   ----------------------- hType: header --------------------------

  Если добавляем в зоне vType: header и hType: header:
  1. добавляем по newCellIndex ячейку в xCells , vType === header  формула - константа
  2. добавляем по newCellIndex ячейку в xCells, vType === body. формула  - формула
  3. добавляем пустую ячейку по newCellIndex vType === footer 

  Если заменяем в зоне vType: body и hType: header:
  1. добавляем по newCellIndex ячейку в xCells, vType === header  формула - константа
  2. добавляем по newCellIndex ячейку в xCells , vType === body. формула  - формула
  3. добавляем пустую ячейку по newCellIndex vType === footer 

  Если заменяем в зоне vType: footer и hType: header:
  1. добавляем пустую ячейку по newCellIndex vType === header 
  2. добавляем пустую ячейку по newCellIndex vType === body 
  3. добавляем по newCellIndex ячейку в xCells , vType === footer. формула  - формула


  */

const placeCell = ({
  cell,
  structure,
  parent,
  index,
  expression,
  needReplace,
  addIndexCoeff,
}) => {
  const toReplace = deepObjectSearch({
    target: structure,
    key: 'id',
    value: parent.id,
  });

  const cellToAdd = cell ? { ...cell, expression } : null;
  if (cell && !expression) {
    delete cellToAdd.expression;
  }
  const deleteCount = needReplace ? 1 : 0;

  const { parentNodes, parentKey } = toReplace[0];
  const parentalArray = parentNodes[0][parentKey].cells;
  parentalArray.splice(
    index + addIndexCoeff < 0 ? 0 : index + addIndexCoeff,
    deleteCount,
    cellToAdd,
  );
  return structure;
};

export default ({ addIndexCoeff, axis, needReplace }) =>
  ({ structure, target, payload }) => {
    const modifyHeader = ({
      neighbour,
      cell,
      index,
      expression,
      reverseAxisType,
    }) => {
      const { name, dataType, formula, variable_id, type } = expression;

      if (neighbour[reverseAxisType] === 'header') {
        placeCell({
          cell,
          structure,
          parent: neighbour,
          index,
          expression: {
            dataType: 'String',
            formula: name,
            type: 'Const',
          },
          needReplace,
          addIndexCoeff,
        });
      }
      if (neighbour[reverseAxisType] === 'body') {
        placeCell({
          cell,
          structure,
          parent: neighbour,
          index,
          expression: { dataType, formula, variable_id, type },
          needReplace,
          addIndexCoeff,
        });
      }

      if (!needReplace && neighbour[reverseAxisType] === 'footer') {
        placeCell({
          cell,
          structure,
          parent: neighbour,
          index,
          expression: null,
          needReplace,
          addIndexCoeff,
        });
      }
    };

    const dropTarget = deepObjectSearch({
      target: structure,
      key: 'id',
      value: target.id,
    });

    if (dropTarget && dropTarget[0]) {
      const { parentKey, parentNodes } = dropTarget[0];
      const { hNeighbours, vNeighbours } = getCrossElements({
        zone: parentNodes[1],
        zones: parentNodes[2],
      });
      const neighbours = axis === 'x' ? hNeighbours : vNeighbours;

      // const neighbours = hNeighbours;

      const axisType = axis === 'y' ? 'vType' : 'hType';
      const reverseAxisType = axis === 'x' ? 'vType' : 'hType';
      const index = Number(parentKey);

      const { dataType, formula, variable_id, type } = payload;

      if (axis === 'x') {
        if (
          parentNodes[1][reverseAxisType] === 'header' &&
          parentNodes[1][axisType] === 'header'
        ) {
          for (let i = 0; i < neighbours.length; i++) {
            const neighbour = neighbours[i];
            let cell;
            if (needReplace) {
              cell =
                neighbour.cells[index] ||
                makeCellObject({
                  parent: neighbour,
                  expression: { dataType, formula, variable_id, type },
                });
            } else {
              cell = makeCellObject({
                parent: neighbour,
                expression: { dataType, formula, variable_id, type },
              });
            }

            modifyHeader({
              neighbour,
              cell,
              index,
              expression: payload,
              addIndexCoeff,
              reverseAxisType,
            });
          }
          return structure;
        }

        if (
          parentNodes[1][reverseAxisType] === 'body' &&
          parentNodes[1][axisType] === 'header'
        ) {
          // const cell = dropTarget[0].target;

          // placeCell({
          //   cell,
          //   structure,
          //   parent: parentNodes[1],
          //   index,
          //   expression: { dataType, formula, variable_id, type },
          //   needReplace,
          //   addIndexCoeff
          // });

          for (let i = 0; i < neighbours.length; i++) {
            const neighbour = neighbours[i];

            let cell;
            if (needReplace) {
              cell =
                neighbour.cells[index] ||
                makeCellObject({
                  parent: neighbour,
                  expression: { dataType, formula, variable_id, type },
                });
            } else {
              cell = makeCellObject({
                parent: neighbour,
                expression: { dataType, formula, variable_id, type },
              });
            }
            modifyHeader({
              neighbour,
              cell,
              index,
              expression: payload,
              addIndexCoeff,
              reverseAxisType,
            });
          }
          return structure;
        }

        // if (parentNodes[1][reverseAxisType] === 'footer') {
        const cell = dropTarget[0].target;
        placeCell({
          cell,
          structure,
          parent: parentNodes[1],
          index,
          expression: { dataType, formula, variable_id, type },
          needReplace,
          addIndexCoeff,
        });
      }
      // }

      if (axis === 'y') {
        console.log('hNeighbours', hNeighbours);
        console.log('vNeighbours', vNeighbours);

        // в vNeighbours - не трогать
        // в hNeighbours - запихнут

        if (parentNodes[1][axisType] === 'header') {
          for (let i = 0; i < neighbours.length; i++) {
            const neighbour = neighbours[i];

            const cell = makeCellObject({
              parent: neighbour,
              expression: { dataType, formula, variable_id, type },
            });

            modifyHeader({
              neighbour,
              cell,
              index,
              expression: payload,
              addIndexCoeff,
              reverseAxisType: axisType,
            });
          }
        }

        if (parentNodes[1][axisType] === 'body') {
          for (let i = 0; i < neighbours.length; i++) {
            const neighbour = neighbours[i];

            const cell = makeCellObject({
              parent: neighbour,
              expression: { dataType, formula, variable_id, type },
            });

            modifyHeader({
              neighbour,
              cell,
              index,
              expression: payload,
              addIndexCoeff,
              reverseAxisType: axisType,
            });
          }
        }

        if (parentNodes[1][axisType] === 'footer') {
          const cell = dropTarget[0].target;
          placeCell({
            cell,
            structure,
            parent: parentNodes[1],
            index,
            expression: { dataType, formula, variable_id, type },
            needReplace,
            addIndexCoeff,
          });
        }
      }
    }
    return structure;
  };
