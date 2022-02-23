/* eslint-disable import/prefer-default-export */
import { request } from '../helpers';
import { notificationShown } from '../reducers/notifications';
import { setItems } from '../reducers/trash';

export const getTrashEvents = queryParams => {
  return async dispatch => {
    try {
      const response = await request({
        func: 'RECYCLE_BIN.LIST',
        params: queryParams,
        dispatch
      });
      if (response?.success) {
        // eslint-disable-next-line no-debugger
        dispatch(setItems(response.result));
      }
    } catch (err) {
      dispatch(
        notificationShown({ message: err.message, messageType: 'error' })
      );
    }
  };
};

export const restoreTrashItem = queryParams => {
  return async dispatch => {
    try {
      const response = await request({
        func: 'RECYCLE_BIN.RESTORE',
        params: queryParams,
        dispatch
      });
      if (response?.success) {
        dispatch(getTrashEvents());
      }
    } catch (err) {
      dispatch(
        notificationShown({ message: err.message, messageType: 'error' })
      );
    }
  };
};

export const clearTrash = queryParams => {
  return async dispatch => {
    try {
      const response = await request({
        func: 'RECYCLE_BIN.CLEAR',
        params: queryParams,
        dispatch
      });
      if (response?.success) {
        dispatch(getTrashEvents());
      }
    } catch (err) {
      dispatch(
        notificationShown({ message: err.message, messageType: 'error' })
      );
    }
  };
};
