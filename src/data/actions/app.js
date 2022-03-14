/* eslint-disable import/prefer-default-export */
import { request, requestReady } from '../helpers';
import { setDictionaries } from '../reducers/data';
import { notificationShown } from '../reducers/notifications';

export const getDictionaries = queryParams => {
  return async dispatch => {
    try {
      const response = await request({
        code: 'CMS.LOGIN',
        params: queryParams,
        dispatch
      });
      if (response) {
        dispatch(setDictionaries(response));
      }
    } catch (err) {
      dispatch(
        notificationShown({ message: err.message, messageType: 'error' })
      );
    }
  };
};

export const getDictionariesReady = (id) => {
  return async dispatch => {
    try {
      const response = await requestReady({
        id,
        dispatch
      });
      if (response?.success) {
        console.log(response.result);
        dispatch(setDictionaries(response.result));
      }
    } catch (err) {
      dispatch(
        notificationShown({ message: err.message, messageType: 'error' })
      );
    }
  };
};
