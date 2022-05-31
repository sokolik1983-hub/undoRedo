import { request } from '../helpers';
import { setConnectors } from '../reducers/data';
import { notificationShown } from '../reducers/notifications';

export const getStreamReceiever = queryParams => {
  return async dispatch => {
    const response = await request({
      code: 'REP.OPEN_FILE',
      params: queryParams,
      dispatch
    });
    if (response) {

      if (response.result === true) {
        localStorage.setItem('streamreceiver', response.thread);

      }
      
    }
  };

}


export const getConnectors = queryParams => {
  return async dispatch => {
    try {
      const response = await request({
        code: 'CONNECT.LIST.READ',
        params: queryParams,
        dispatch
      });
      if (response?.success) {
        dispatch(setConnectors(response.result));
      }
    } catch (err) {
      dispatch(
        notificationShown({ message: err.message, messageType: 'error' })
      );
    }
  };
};

export const saveConnector = queryParams => {
  return async dispatch => {
    try {
      await request({
        code: 'CONNECT.SAVE',
        params: queryParams,
        dispatch
      });
    } catch (err) {
      dispatch(
        notificationShown({ message: err.message, messageType: 'error' })
      );
    }
  };
};

export const removeConnector = queryParams => {
  return async dispatch => {
    try {
      await request({
        code: 'CONNECT.DROP',
        params: queryParams,
        dispatch
      });
    } catch (err) {
      dispatch(
        notificationShown({ message: err.message, messageType: 'error' })
      );
    }
  };
};
