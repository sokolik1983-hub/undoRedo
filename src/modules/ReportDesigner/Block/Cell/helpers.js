/* eslint-disable no-unused-vars */
import { deepObjectSearch } from '../../../../data/helpers';

const swapId = array => {
  const letterKey = array[array.length - 2];
  if (letterKey === 'H' || letterKey === 'B') {
    array.splice(array.length - 2, 1, letterKey === 'H' ? 'B' : 'H')
    return array.join('.');
  }
  return null;
};

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

  const splittedId = String(target.id).split('.');

  const swappedId = swapId(splittedId);

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
  return structure;
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
