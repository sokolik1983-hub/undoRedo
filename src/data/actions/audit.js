/* eslint-disable import/prefer-default-export */
import { request } from '../helpers';
import { setEvents } from '../reducers/audit';

export const getAuditEvents = queryParams => {
  return async dispatch => {
    try {
      const response = await request({
        func: 'AUDIT.READ',
        params: queryParams
      });
      if (response && response.success) {
        dispatch(setEvents(response.result));
      }
    } catch (err) {
      // If something went wrong, handle it here
    }
  };
};
