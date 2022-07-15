import {request} from '../helpers';
import {
  setConnectorData,
  setConnectorSource,
  setConnectors,
  setConnectorsFolderId,
  setConnectorsTypes,
  setCreateConnector,
  setCreateConnectorResult,
  setTestConnector,
} from '../reducers/data';
import {setConnectorObjects} from '../reducers/schemaDesigner';
import {showEditConnectorModal} from '../reducers/ui';

export const getStreamReceiever = (queryParams) => {
  return async (dispatch) => {
    const response = await request({
      code: 'REP.OPEN_FILE',
      params: queryParams,
      dispatch,
    });
    if (response) {
      if (response.result === 1) {
        localStorage.setItem('streamreceiver', response.header.thread);
      }
    }
  };
};

export const getConnectorFolderChildren = (queryParams) => {
  return async (dispatch) => {
    const response = await request({
      code: 'REPOS.GET_CHILDREN',
      params: queryParams,
      dispatch,
    });
    if (response?.result) {
      dispatch(setConnectors(response.data));
    }
  };
};

export const getConnectorsFolderId = (queryParams) => {
  return async (dispatch) => {
    const response = await request({
      code: 'REPOS.GET_SPECIAL_FOLDER',
      params: queryParams,
      dispatch,
    });
    if (response?.result) {
      dispatch(setConnectorsFolderId(response.id));
    }
  };
};

export const getConnector = (queryParams) => {
  return async (dispatch) => {
    const response = await request({
      code: 'CN.OPEN',
      params: queryParams,
      dispatch,
    });
    if (response?.result) {
      dispatch(setConnectorData(response));
      dispatch(showEditConnectorModal());
    }
  };
};

export const saveConnector = (queryParams) => {
  return async (dispatch) => {
    const response = await request({
      code: 'CN.SAVE',
      params: queryParams,
      dispatch,
    });
    dispatch(setCreateConnectorResult(response));
  };
};

export const getObjectFromConnector = (queryParams) => {
  return async (dispatch) => {
    const response = await request({
      code: 'CN.GET_OBJECTS',
      params: queryParams,
      dispatch,
    });
    if (response?.result) {
      dispatch(setConnectorObjects(response.data));
    }
  };
};

export const createConnector = (queryParams) => {
  return async (dispatch) => {
    const response = await request({
      code: 'CN.CREATE',
      params: queryParams,
      dispatch,
    });
    if (response?.result) {
      dispatch(setCreateConnector(response));
    }
  };
};

export const getConnectorTypesSources = (queryParams) => {
  return async (dispatch) => {
    const response = await request({
      code: 'CN.GET_TYPES',
      params: queryParams,
      dispatch,
    });
    if (response?.result) {
      dispatch(setConnectorsTypes(response?.classes));
      dispatch(setConnectorSource(response?.types));
    }
  };
};

export const testConnector = (queryParams) => {
  return async (dispatch) => {
    const response = await request({
      code: 'CN.TEST',
      params: queryParams,
      dispatch,
    });
    if (response?.result) {
      dispatch(setTestConnector(response));
    }
  };
};
