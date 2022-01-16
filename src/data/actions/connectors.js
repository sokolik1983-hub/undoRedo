import { request } from '../helpers';
import { setConnectors } from '../reducers/data';
import { showNotification } from '../reducers/notifications';

export const getConnectors = queryParams => {
  return async dispatch => {
    try {
      const response = await request({
        func: 'CONNECT.LIST.READ',
        params: queryParams,
        dispatch
      });
      if (response?.success) {
        dispatch(setConnectors(response.result));
      }
    } catch (err) {
      dispatch(
        showNotification({ message: err.message, messageType: 'error' })
      );
    }
  };
};

export const saveConnector = queryParams => {
  return async dispatch => {
    try {
      await request({
        func: 'CONNECT.SAVE',
        params: queryParams,
        dispatch
      });
    } catch (err) {
      dispatch(
        showNotification({ message: err.message, messageType: 'error' })
      );
    }
  };
};
