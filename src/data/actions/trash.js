import {request} from '../helpers';
import {notificationShown} from '../reducers/notifications';
import {
    setConnectorTrash,
    setReportTrash,
    setTrash,
    setTrashConFolderId,
    setTrashRepFolderId,
} from '../reducers/trash';

export const getTrashEvents = (queryParams) => {
    return async (dispatch) => {
        try {
            const response = await request({
                func: 'RECYCLE_BIN.LIST',
                params: queryParams,
                dispatch,
            });
            if (response?.success) {
                dispatch(setTrash(response.result));
            }
        } catch (err) {
            dispatch(
                notificationShown({message: err.message, messageType: 'error'}),
            );
        }
    };
};

export const getTrashFolderChildren = (queryParams, trashType) => {
    return async (dispatch) => {
        try {
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
        } catch (err) {
            dispatch(
                notificationShown({message: err.message, messageType: 'error'}),
            );
        }
    };
};

export const getTrashFolderId = (queryParams, trashType) => {
    return async (dispatch) => {
        try {
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
        } catch (err) {
            dispatch(
                notificationShown({message: err.message, messageType: 'error'}),
            );
        }
    };
};
export const restoreTrashItem = (queryParams) => {
    return async (dispatch) => {
        try {
            const response = await request({
                func: 'RECYCLE_BIN.RESTORE',
                params: queryParams,
                dispatch,
            });
            if (response?.success) {
                dispatch(getTrashEvents());
            }
        } catch (err) {
            dispatch(
                notificationShown({message: err.message, messageType: 'error'}),
            );
        }
    };
};

export const clearTrash = (queryParams) => {
    return async (dispatch) => {
        try {
            const response = await request({
                func: 'RECYCLE_BIN.CLEAR',
                params: queryParams,
                dispatch,
            });
            if (response?.success) {
                dispatch(getTrashEvents());
            }
        } catch (err) {
            dispatch(
                notificationShown({message: err.message, messageType: 'error'}),
            );
        }
    };
};
