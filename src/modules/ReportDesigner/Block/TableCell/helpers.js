/* eslint-disable no-unused-vars */
import { deepObjectSearch } from '../../../../data/helpers';
import { generateId } from '../../helpers';

const getFooterId = str => {
  const splittedId = String(str).split('.');
  const letterKey = splittedId[splittedId.length - 2];
  if (letterKey === 'H' || letterKey === 'B') {
    splittedId.splice(splittedId.length - 2, 1, 'F');
    return splittedId.join('.');
  }
  return null;
};

const swapIds = str => {
  const splittedId = String(str).split('.');
  const letterKey = splittedId[splittedId.length - 2];
  if (letterKey === 'H' || letterKey === 'B') {
    splittedId.splice(splittedId.length - 2, 1, letterKey === 'H' ? 'B' : 'H');
    return [splittedId.join('.'), getFooterId(str)];
  }
  return [];
};

const makeCellObject = ({ parent, expression }) => {
  const obj = { id: `${parent.id}.${generateId()}` };
  if (!expression) {
    return obj;
  }

  return {
    ...obj,
    expression
  };
};

const tweakExpression = ({ id, expression }) => {
  if(!expression) return null
  const { name, ...rest } = expression;
  const splittedId = id.split('.');

  if (splittedId[splittedId.length - 2] === 'H') {
    return {
      dataType: 'String',
      formula: name,
      type: 'Const'
    };
  }

  return { ...rest };
};

export const handleReplace = ({ structure, target, payload, once = false }) => {
  const toReplace = deepObjectSearch({
    target: structure,
    key: 'id',
    value: target.id
  });

  if (toReplace && toReplace[0]) {
    toReplace[0].target.expression = tweakExpression({
      id: target.id,
      expression: payload
    });
  }

  if (once) {
    return structure;
  }

  const [swappedId, footerId] = swapIds(target.id);

  if (swappedId) {
    const updatedStructure = handleReplace({
      structure,
      target: { id: swappedId },
      payload,
      once: true
    });
    return updatedStructure;
  }

  return structure;
};

const addItem = ({ structure, target, payload, position, once = false }) => {
  const dropTarget = deepObjectSearch({
    target: structure,
    key: 'id',
    value: target.id
  });

  if (!dropTarget || !dropTarget[0]) {
    return structure;
  }

  const { parentKey, parentNodes } = dropTarget[0];
  const parent = parentNodes[0];
  const coeff = position === 'after' ? 1 : 0;
  const targetIndex = Number(parentKey) + coeff;

  parent.splice(
    targetIndex,
    0,
    makeCellObject({
      parent: parentNodes[1],
      expression: tweakExpression({ id: target.id, expression: payload })
    })
  );

  for (let i = 0; i < parent.length; i++) {
    parent[i].row = 1;
    parent[i].col = i + 1;
  }

  if (once) {
    return structure;
  }

  const [swappedTargetId, footerId] = swapIds(target.id);

  let updatedStructure = addItem({
    structure,
    target: { id: swappedTargetId },
    payload,
    once: true,
    position
  });

  updatedStructure = addItem({
    structure,
    target: { id: footerId },
    payload: null,
    once: true,
    position
  });

  return updatedStructure;
};

export const handleAddBefore = params =>
  addItem({ ...params, position: 'before' });

export const handleAddAfter = params =>
  addItem({ ...params, position: 'after' });

export const handleAddAbove = ({ structure, target, payload }) => {
  return structure;
};

export const handleAddBelow = ({ structure, target, payload }) => {
  return structure;
};
