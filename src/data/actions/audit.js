import { request } from '../helpers';
import { setEvents } from '../reducers/audit';

export const getAuditEvents = (queryParams) => {
  return async (dispatch) => {
    const response = await request({
      func: 'AUDIT.READ',
      params: queryParams,
      dispatch,
    });
    if (response?.success) {
      dispatch(setEvents(response.result));
    }
  };
};
