import { TOAST_TYPE } from '../../common/constants/common';
/* eslint-disable no-unused-vars */
import translitNames from '../../layout/components/TopBar/PageActions/helper';
import { getTableIdFromParams, request } from '../helpers';
import {
  setConnectorId,
  setCurrentUniverse,
  setListReports,
  setReportsFolderId,
  setSampleUniverseObject,
  setUniverseIsCreated,
  setUniverses,
  setUniversesFolderId,
} from '../reducers/data';
import { notificationShown } from '../reducers/notifications';
import {
  addObjectLayer,
  loadObjectsLayer,
  loadSelectedTablesArray,
  loadSelectedTablesData,
  setLinks,
  setLoadingUniverse,
  setSelectedTables,
  setUniverseName,
} from '../reducers/schemaDesigner';
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
import { showToast } from './app';
import { getObjectFromConnector } from './connectors';

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

export const createSampleUniverse = (queryParams) => {
  return async (dispatch) => {
    try {
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
    } catch (err) {
      dispatch(
        setSampleUniverseObject({
          header: response.header,
          data: response.data,
        }),
      );
    }
  };
};

export const openUniverse = (queryParams, layerName) => {
  return async (dispatch) => {
    const response = await request({
      code: 'UNV.OPEN',
      params: queryParams,
      dispatch,
    });
    if (response?.result) {
      dispatch(setUniverseName(layerName));
      dispatch(loadSelectedTablesData(response.data.tables));
      dispatch(loadSelectedTablesArray(response.data.tables));
      dispatch(setLinks(response.data.links));
      dispatch(setLoadingUniverse(true));

      response.data.tables.forEach((table) => {
        console.log(table);
        dispatch(
          setSelectedTables({
            [getTableIdFromParams(table)]: table,
          }),
        );
      });
    }
    dispatch(setConnectorId(response.data.connector_id));
    const objects = response.data.objects.map((object) => {
      const tempObj = { ...object };
      tempObj.refreshBeforeUsageCheckBox = false;
      tempObj.searchDelegetionCheckBox = false;
      tempObj.showHierarchyCheckBox = false;
      tempObj.thisListEditCheckBox = false;
      tempObj.useInConditionsCheckBox = false;
      tempObj.useInResultsCheckBox = false;
      tempObj.useInSortingsCheckBox = false;
      tempObj.techInfoInput = '';
      tempObj.originInput = '';
      tempObj.defaultLinkInput = '';
      tempObj.displayInput = '';
      tempObj.exportByUniverseCheckBox = false;
      tempObj.keysDataType = '';
      tempObj.keysSelectInput = '';
      tempObj.keysWhereInput = '';
      tempObj.keysType = '';
      tempObj.usagePermission = '';
      tempObj.dataType = 'Symbol';
      tempObj.aggFunc = 'SUM';
      tempObj.aggFuncName = 'SUM';
      tempObj.objectFunction = '';
      tempObj.objectDescription = tempObj.description;
      tempObj.objectDataType = translitNames(tempObj.userDataType);
      tempObj.objectType = translitNames(tempObj.objectType);
      tempObj.selectQueryField = tempObj.select;
      tempObj.whereQueryField = tempObj.where;
      tempObj.tables = [1];
      tempObj.parent_id = 0;
      tempObj.mask = null;
      delete tempObj.where;
      delete tempObj.select;
      delete tempObj.description;
      delete tempObj.userDataType;
      delete tempObj.dataType;
      delete tempObj.aggFunc;
      delete tempObj.aggFuncName;
      delete tempObj.tables;
      delete tempObj.parent_id;
      delete tempObj.mask;
      return tempObj;
    });
    dispatch(loadObjectsLayer(objects));
    dispatch(getObjectFromConnector({ id: response.data.connector_id }));
    dispatch(
      setCurrentUniverse({ header: response.header, data: response.data }),
    );
  };
};

export const createUniverse = (queryParams, layerName) => {
  return async (dispatch) => {
    const response = await request({
      code: 'UNV.SAVE',
      params: queryParams,
      dispatch,
    });
    if (response?.result) {
      dispatch(setUniverseIsCreated(true));
      dispatch(setUniverseName(layerName));
      dispatch(
        showToast(
          TOAST_TYPE.SUCCESS,
          `Семантический слой ${layerName} сохранен`,
        ),
      );
    }
  };
};

// export const createQuery = (queryParams) => async (dispatch) => {
//   const response = await request({
//     code: 'UNV.GET_SQL',
//     params: queryParams,
//     dispatch,
//   });
//   if (response) {
//     dispatch(setQueryData(response));
//   }
// };

export const getListReports = (queryParams) => {
  return async (dispatch) => {
    try {
      const response = await request({
        func: 'REPORT.LIST.READ',
        params: queryParams,
        dispatch,
      });
      if (response?.success) {
        dispatch(setListReports(response.result));
      }
    } catch (err) {
      dispatch(
        notificationShown({ message: err.message, messageType: 'error' }),
      );
    }
  };
};

export const getReportsFolderChildren = (queryParams) => {
  return async (dispatch) => {
    try {
      const response = await request({
        code: 'REPOS.GET_CHILDREN',
        params: queryParams,
        dispatch,
      });
      if (response?.result) {
        dispatch(setListReports(response.data));
      }
    } catch (err) {
      dispatch(
        notificationShown({ message: err.message, messageType: 'error' }),
      );
    }
  };
};

export const getReportsFolderId = (queryParams) => {
  return async (dispatch) => {
    try {
      const response = await request({
        code: 'REPOS.GET_SPECIAL_FOLDER',
        params: queryParams,
        dispatch,
      });
      if (response?.result) {
        dispatch(setReportsFolderId(response.id));
      }
    } catch (err) {
      dispatch(
        notificationShown({ message: err.message, messageType: 'error' }),
      );
    }
  };
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

export const setCreateObjectModal = (open, field) => {
  return (dispatch) =>
    dispatch(open ? showCreateObjectModal(field) : closeCreateObjectModal());
};

export const setEditObjectModal = (object) => {
  return (dispatch) =>
    dispatch(object ? showEditObjectModal(object) : closeEditObjectModal());
};
