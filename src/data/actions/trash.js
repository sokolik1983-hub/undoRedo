import {request} from '../helpers';
import {notificationShown} from '../reducers/notifications';
import {
  setConnectorTrash,
  setReportTrash,
  setTrash,
  setTrashConFolderId,
  setTrashRepFolderId,
} from '../reducers/trash';

export const getTrashFolderChildren = (queryParams, trashType) => {
  return async (dispatch) => {
    const response = await request({
      code: 'REPOS.GET_CHILDREN',
      params: queryParams,
      dispatch,
    });
    if (response?.result) {
      switch (trashType) {
        case 'CN':
          dispatch(setConnectorTrash(response.data.list));
          break;
        case 'REP':
          dispatch(setReportTrash(response.data.list));
          break;
        default:
          dispatch(setTrash(response.data.list));
          break;
      }
    }
  };
};

export const getTrashFolderId = (queryParams, trashType) => {
  return async (dispatch) => {
    const response = await request({
      code: 'REPOS.GET_SPECIAL_FOLDER',
      params: queryParams,
      dispatch,
    });
    if (response?.result) {
      switch (trashType) {
        case 'CN':
          dispatch(setTrashConFolderId(response.id));
          break;
        case 'REP':
          dispatch(setTrashRepFolderId(response.id));
          break;
        default:
          break;
      }
    }
  };
};
