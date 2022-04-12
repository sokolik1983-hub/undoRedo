/* eslint-disable import/prefer-default-export */
export const flat = arr => {
  let result = [];

  if (!arr.length) return result;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].isFolder) {
      result = [...result, ...flat(arr[i].children)];
    } else result = [...result, arr[i]];
  }

  return result;
};
