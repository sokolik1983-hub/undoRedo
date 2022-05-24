/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/no-cycle
import { request } from '../helpers';
import { setDictionaries } from '../reducers/data';
// eslint-disable-next-line import/no-cycle
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
