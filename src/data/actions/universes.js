/* eslint-disable no-unused-vars */
import { request } from '../helpers';
import { setQueryData, setSymanticLayerData, setUniverses, setSymanticLayerQueryResult, setQueryResult, setListReports, setQueryPanelSymlayersData, setUniversesFolderId, setReportsFolderId, setSampleUniverseObject, setUniverseIsCreated } from '../reducers/data';
import { notificationShown } from '../reducers/notifications';
import { showObjectsConnectionsModal, closeModal, showQueryPanelModal, showSemanticLayerModal, showTablePreviewModal, showCreateObjectModal, closeCreateObjectModal,showEditObjectModal, closeEditObjectModal, showConfirmModal, closeConfirmModal } from '../reducers/ui';

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

export const getUniversesFolderChildren = queryParams => {
  return async dispatch => {
    try {
      const response = await request({
        code: 'REPOS.GET_CHILDREN',
        params: queryParams,
        dispatch
      });
      if (response?.result) {
        dispatch(setUniverses(response.data));
      }
    } catch (err) {
      dispatch(
        notificationShown({ message: err.message, messageType: 'error' })
      );
    }
  }
}

export const getUniversesFolderId = queryParams => {
  return async dispatch => {
    try {
      const response = await request({
        code: 'REPOS.GET_SPECIAL_FOLDER',
        params: queryParams,
        dispatch
      });
      if (response?.result) {
        dispatch(setUniversesFolderId(response.id));
      }
    } catch (err) {
      dispatch(
        notificationShown({ message: err.message, messageType: 'error' })
      );
    }
  }
}

export const createSampleUniverse = queryParams => {
  return async dispatch => {
    try {
      const response = await request({
        code: 'UNV.CREATE',
        params: queryParams,
        dispatch
      });
      if (response?.result) {
        dispatch(setSampleUniverseObject({header: response.header, data: response.data}));
      }
    } catch (err) {
      dispatch(
        notificationShown({ message: err.message, messageType: 'error' })
      );
    }
  }
}

export const createUniverse = queryParams => {
  return async dispatch => {
    const response = await request({
      code: 'UNV.SAVE',
      params: queryParams,
      dispatch
    });
    if (response?.result) {
      dispatch(setUniverseIsCreated(true));
    }
  }
}

export const getQueryPanelSymanticLayerData = id => {
  /* return async dispatch => {
    try {
      const response = await requestSymLayerData({
        id,
        dispatch
      });

      if (response?.success) {
        dispatch(setQueryPanelSymlayersData(response.result));
      }
    } catch (err) {
      dispatch(
        notificationShown({ message: err.message, messageType: 'error' })
      );
    }
  } */
  return null;
}

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

export const createQuery = queryParams => {
  return async dispatch => {
    try {
      const response = await request({
        func: 'QUERY.CREATE',
        params: queryParams,
        dispatch
      });

      if (response?.success) {
        dispatch(setQueryData(response.result));
      }
    } catch (err) {
      dispatch(
        notificationShown({ message: err.message, messageType: 'error' })
      );
    }
  };
};

export const semanticLayerDataQuery = queryParams => {
  return async dispatch => {
    try {
      const response = await request({
        func: 'CONNECT.START_SQL',
        params: queryParams,
        dispatch
      });
      if (response?.success) {
        dispatch(setSymanticLayerQueryResult(response.result));
      }
    } catch (err) {
      dispatch(
        notificationShown({ message: err.message, messageType: 'error' })
      );
    }
  };
};

export const getListReports = queryParams => {
  return async dispatch => {
    try {
      const response = await request({
        func: 'REPORT.LIST.READ',
        params: queryParams,
        dispatch
      });
      if (response?.success) {
        dispatch(setListReports(response.result));
      }
    } catch (err) {
      dispatch(
        notificationShown({ message: err.message, messageType: 'error' })
      );
    }
  };
}

export const getReportsFolderChildren = queryParams => {
  return async dispatch => {
    try {
      const response = await request({
        code: 'REPOS.GET_CHILDREN',
        params: queryParams,
        dispatch
      });
      if (response?.result) {
        dispatch(setListReports(response.data));
      }
    } catch (err) {
      dispatch(
        notificationShown({ message: err.message, messageType: 'error' })
      );
    }
  }
}

export const getReportsFolderId = queryParams => {
  return async dispatch => {
    try {
      const response = await request({
        code: 'REPOS.GET_SPECIAL_FOLDER',
        params: queryParams,
        dispatch
      });
      if (response?.result) {
        dispatch(setReportsFolderId(response.id));
      }
    } catch (err) {
      dispatch(
        notificationShown({ message: err.message, messageType: 'error' })
      );
    }
  };
};

export const getResultFromQuery = queryParams => {
  return async dispatch => {
    try {
      const response = await request({
        func: 'CONNECT.GET_RESULT_SQL',
        params: queryParams,
        dispatch
      });
      if (response?.success) {
        dispatch(setQueryResult(response.result));
      }
    } catch (err) {
      dispatch(
        notificationShown({ message: err.message, messageType: 'error' })
      );
    }
  };
};

export const setObjectsConnectionsModal = (open, link) => {
  return dispatch => dispatch(open ? showObjectsConnectionsModal(link) : closeModal());
};

export const setQueryPanelModal = (open) => {
  return dispatch => dispatch(open ? showQueryPanelModal() : closeModal());
};

export const setTablePreviewModal = (open) => {
  return dispatch => dispatch(open ? showTablePreviewModal() : closeModal())
}

export const setSemanticLayerModal = (open) => {
  return dispatch => dispatch(open ? showSemanticLayerModal() : closeModal());
};

export const setConfirmModal = (open) => {
  return dispatch => dispatch(open ? showConfirmModal() : closeConfirmModal());
};

export const setCreateObjectModal = (open) => {
  return dispatch => dispatch(open ? showCreateObjectModal() : closeCreateObjectModal());
};

export const setEditObjectModal = (object) => {
  return dispatch => dispatch(object ? showEditObjectModal(object) : closeEditObjectModal());
};

