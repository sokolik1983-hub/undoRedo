import { request } from '../helpers';
import { setUniverses } from '../reducers/data';
import { notificationShown } from '../reducers/notifications';
import { showObjectsConnectionsModal, closeModal } from '../reducers/ui';

export const getUniverses = queryParams => {
  return async dispatch => {
    try {
      const response = await request({
        func: 'SYMLAYER.LIST.READ',
        params: queryParams,
        dispatch
      });
      if (response?.success) {
        dispatch(setUniverses(response.result));
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
        func: 'CONNECT.SAVE',
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
        func: 'CONNECT.DROP',
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

export const setObjectsConnectionsModal = (open) => {
  return dispatch => dispatch(open ? showObjectsConnectionsModal() : closeModal());
};
