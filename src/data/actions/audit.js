/* eslint-disable import/prefer-default-export */
import { request } from '../helpers';
import { setEvents } from '../reducers/audit';
import { showNotification } from '../reducers/notifications';

export const getAuditEvents = queryParams => {
  return async dispatch => {
    try {
      const response = await request({
        func: 'AUDIT.READ',
        params: queryParams,
        dispatch
      });
      if (response?.success) {
        dispatch(setEvents(response.result));
      }
    } catch (err) {
      dispatch(
        showNotification({ message: err.message, messageType: 'error' })
      );
    }
  };
};
