/* eslint-disable import/prefer-default-export */
import { request } from '../helpers';
import { setDictionaries } from '../reducers/data';
import { showNotification } from '../reducers/notifications';

export const getDictionaries = queryParams => {
  return async dispatch => {
    try {
      const response = await request({
        func: 'DIC.ALL',
        params: queryParams,
        dispatch
      });
      if (response?.success) {
        dispatch(setDictionaries(response.result));
      }
    } catch (err) {
      dispatch(
        showNotification({ message: err.message, messageType: 'error' })
      );
    }
  };
};