import lodash from 'lodash';

// eslint-disable-next-line import/prefer-default-export
export function getCurrentReport(array, id) {
  return lodash.find(array, item => item.id === id);
}
