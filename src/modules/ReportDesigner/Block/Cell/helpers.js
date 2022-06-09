/* eslint-disable no-unused-vars */
import { deepObjectSearch } from '../../../../data/helpers';
import { generateId } from '../../helpers';

const swapId = str => {
  const splittedId = String(str.id).split('.');
  const letterKey = splittedId[splittedId.length - 2];
  if (letterKey === 'H' || letterKey === 'B') {
    splittedId.splice(splittedId.length - 2, 1, letterKey === 'H' ? 'B' : 'H');
    return splittedId.join('.');
  }
  return null;
};

const makeCellObject = ({ parent, expression }) => ({
  id: `${parent.id}.${generateId()}`,
  expression
});

export const handleReplace = ({ structure, target, payload, once = false }) => {
  const toReplace = deepObjectSearch({
    target: structure,
    key: 'id',
    value: target.id
  });

  if (toReplace && toReplace[0]) {
    toReplace[0].target.expression = payload;
  }

  if (once) {
    return structure;
  }

  const swappedId = swapId(target.id);

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

export const handleAddBefore = ({ structure, target, payload }) => {
  const dropTarget = deepObjectSearch({
    target: structure,
    key: 'id',
    value: target.id
  });

  if (!dropTarget || !dropTarget[0]) {
    return structure;
  }

  const { parent, targetIndex } = dropTarget[0];
/*eslint-disable */

  if (targetIndex === 0) {
    return structure;
  } else {
    parent.splice(
      targetIndex - 1,
      0,
      makeCellObject({ parent, expression: payload })
    );
    const swappedTargetId = swapId(target.id);
    const updatedStructure = handleAddBefore({
      structure,
      target: { id: swappedTargetId },
      payload
    });

    return updatedStructure;
  }

};

export const handleAddAfter = ({ structure, target, payload }) => {
  return structure;
};

export const handleAddAbove = ({ structure, target, payload }) => {
  return structure;
};

export const handleAddBelow = ({ structure, target, payload }) => {
  return structure;
};
