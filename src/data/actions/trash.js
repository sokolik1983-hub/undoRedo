/* eslint-disable import/prefer-default-export */
import { request } from '../helpers';
import { notificationShown } from '../reducers/notifications';
import { setTrash, setTrashFolderId } from '../reducers/trash';

export const getTrashEvents = queryParams => {
  return async dispatch => {
    try {
      const response = await request({
        func: 'RECYCLE_BIN.LIST',
        params: queryParams,
        dispatch
      });
      if (response?.success) {
        dispatch(setTrash(response.result));
      }
    } catch (err) {
      dispatch(
        notificationShown({ message: err.message, messageType: 'error' })
      );
    }
  };
};

export const getTrashFolderChildren = queryParams => {
  return async dispatch => {
    try {
      const response = await request({
        code: 'REPOS.GET_CHILDREN',
        params: queryParams,
        dispatch
      }); 
      if (response?.result) {
        dispatch(setTrash(response.data));
      }
    } catch (err) {
      dispatch(
        notificationShown({ message: err.message, messageType: 'error' })
      );
    }
  }
}

export const getTrashFolderId = queryParams => {
  return async dispatch => {
    try {
      const response = await request({
        code: 'REPOS.GET_SPECIAL_FOLDER',
        params: queryParams,
        dispatch
      });
      if (response?.result) {
        dispatch(setTrashFolderId(response.id));
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
