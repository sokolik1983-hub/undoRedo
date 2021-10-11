/* eslint-disable import/prefer-default-export */
export const deepFind = ({ array, key = 'id', value }) => {
  const target = array.reduce((accum, current) => {
    if (current[key] === value) accum = current;
    if (current.children && current.children.length > 0) {
      const childrenSearchResult = deepFind({
        key,
        value,
        array: current.children
      });
      if (childrenSearchResult) accum = childrenSearchResult;
    }
    return accum;
  }, null);

  return target;
};
