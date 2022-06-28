import { request } from '../helpers';
import { setCreateConnectorResult, setCreateConnector, setConnectorSource, setConnectorData, setConnectors, setConnectorsFolderId, setConnectorsTypes } from '../reducers/data';
import { notificationShown } from '../reducers/notifications';
import { showEditConnectorModal } from '../reducers/ui';

export const getStreamReceiever = queryParams => {
  return async dispatch => {
    const response = await request({
      code: 'REP.OPEN_FILE',
      params: queryParams,
      dispatch
    });
    if (response) {

      if (response.result === true) {
        localStorage.setItem('streamreceiver', response.header.thread);

      }

    }
  };

}


export const getConnectorFolderChildren = queryParams => {
  return async dispatch => {
    try {
      const response = await request({
        code: 'REPOS.GET_CHILDREN',
        params: queryParams,
        dispatch
      });
      if (response?.result) {
        dispatch(setConnectors(response.data));
      }
    } catch (err) {
      dispatch(
        notificationShown({ message: err.message, messageType: 'error' })
      );
    }
  }
}

export const getConnectorsFolderId = queryParams => {
  return async dispatch => {
    try {
      const response = await request({
        code: 'REPOS.GET_SPECIAL_FOLDER',
        params: queryParams,
        dispatch
      });
      if (response?.result) {
        dispatch(setConnectorsFolderId(response.id));
      }
    } catch (err) {
      dispatch(
        notificationShown({ message: err.message, messageType: 'error' })
      );
    }
  };
};

export const getConnector = queryParams => {
  return async dispatch => {
    try {
      const response = await request({
        code: 'CN.OPEN',
        params: queryParams,
        dispatch
      });
      if (response?.result) {
        dispatch(setConnectorData(response.data));
        dispatch(showEditConnectorModal());
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
      const response = await request({
        code: 'CN.SAVE',
        params: queryParams,
        dispatch
      });
      dispatch(setCreateConnectorResult(response));
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

export const createConnector = queryParams => {
  return async dispatch => {
    const response = await request({
      code: 'CN.CREATE',
      params: queryParams,
      dispatch
    });
    dispatch(setCreateConnector(response));
  };
};

export const getConnectorTypesSources = queryParams => {
  return async dispatch => {
    const response = await request({
      code: 'CN.GET_TYPES',
      params: queryParams,
      dispatch
    });
    dispatch(setConnectorsTypes(response?.classes));
    dispatch(setConnectorSource(response?.types));
  };
};
