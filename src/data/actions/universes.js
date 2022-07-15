/* eslint-disable no-unused-vars */
import {request} from '../helpers';
import {
  setListReports,
  setQueryData,
  setQueryPanelSymlayersData,
  setQueryResult,
  setReportsFolderId,
  setSampleUniverseObject,
  setSymanticLayerData,
  setSymanticLayerQueryResult,
  setUniverseIsCreated,
  setUniverses,
  setUniversesFolderId,
} from '../reducers/data';
import {
  closeConfirmModal,
  closeCreateObjectModal,
  closeEditObjectModal,
  closeModal,
  showConfirmModal,
  showCreateObjectModal,
  showEditObjectModal,
  showObjectsConnectionsModal,
  showQueryPanelModal,
  showSemanticLayerModal,
  showTablePreviewModal,
} from '../reducers/ui';
import {setReportDpRefreshed} from './newReportDesigner';

export const getUniversesFolderChildren = (queryParams) => async (dispatch) => {
  const response = await request({
    code: 'REPOS.GET_CHILDREN',
    params: queryParams,
    dispatch,
  });
  if (response?.result) {
    dispatch(setUniverses(response.data));
  }
};

export const getUniversesFolderId = (queryParams) => {
  return async (dispatch) => {
    const response = await request({
      code: 'REPOS.GET_SPECIAL_FOLDER',
      params: queryParams,
      dispatch,
    });
    if (response?.result) {
      dispatch(setUniversesFolderId(response.id));
    }
  };
};

export const getQueryPanelSymanticLayerData = (id) => async (dispatch) => {
  const response = await request({
    code: 'UNV.GET_DATA_QP',
    params: {id},
    dispatch,
  });
  if (response) dispatch(setQueryPanelSymlayersData(response.qpData));
};

export const createSampleUniverse = (queryParams) => {
  return async (dispatch) => {
    const response = await request({
      code: 'UNV.CREATE',
      params: queryParams,
      dispatch,
    });
    if (response?.result) {
      dispatch(
        setSampleUniverseObject({
          header: response.header,
          data: response.data,
        }),
      );
    }
  };
};

export const createUniverse = (queryParams) => {
  return async (dispatch) => {
    const response = await request({
      code: 'UNV.SAVE',
      params: queryParams,
      dispatch,
    });
    if (response?.result) {
      dispatch(setUniverseIsCreated(true));
    }
  };
};

export const createQuery = (queryParams) => async (dispatch) => {
  const response = await request({
    code: 'UNV.GET_SQL',
    params: queryParams,
    dispatch,
  });
  if (response) {
    dispatch(setQueryData(response));
  }
};

export const getReportsFolderChildren = (queryParams) => {
  return async (dispatch) => {
    const response = await request({
      code: 'REPOS.GET_CHILDREN',
      params: queryParams,
      dispatch,
    });
    if (response?.result) {
      dispatch(setListReports(response.data));
    }
  };
};

export const getReportsFolderId = (queryParams) => {
  return async (dispatch) => {
    const response = await request({
      code: 'REPOS.GET_SPECIAL_FOLDER',
      params: queryParams,
      dispatch,
    });
    if (response?.result) {
      dispatch(setReportsFolderId(response.id));
    }
  };
};

export const getResultFromQuery = (queryParams) => async (dispatch) => {
  const response = await request({
    code: 'CN.GET_DATA',
    params: queryParams,
    dispatch,
  });
  if (response) {
    dispatch(setQueryResult(response));
  }
};

export const postQueryPanelTab = (queryParams) => async (dispatch) => {
  const response = await request({
    code: 'REP.SET_DP',
    params: queryParams,
    dispatch,
  });
  if (response) {
    dispatch(setReportDpRefreshed());
  }
};

export const setObjectsConnectionsModal = (open, link) => {
  return (dispatch) =>
    dispatch(open ? showObjectsConnectionsModal(link) : closeModal());
};

export const setQueryPanelModal = (open) => {
  return (dispatch) => dispatch(open ? showQueryPanelModal() : closeModal());
};

export const setTablePreviewModal = (open) => {
  return (dispatch) => dispatch(open ? showTablePreviewModal() : closeModal());
};

export const setSemanticLayerModal = (open) => {
  return (dispatch) => dispatch(open ? showSemanticLayerModal() : closeModal());
};

export const setConfirmModal = (open) => {
  return (dispatch) =>
    dispatch(open ? showConfirmModal() : closeConfirmModal());
};

export const setCreateObjectModal = (open) => {
  return (dispatch) =>
    dispatch(open ? showCreateObjectModal() : closeCreateObjectModal());
};

export const setEditObjectModal = (object) => {
  return (dispatch) =>
    dispatch(object ? showEditObjectModal(object) : closeEditObjectModal());
};
