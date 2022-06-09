/* eslint-disable camelcase */
import { getTableIdFromParams, request } from '../helpers';
import { notificationShown } from '../reducers/notifications';
import {
  setConnectorObjects,
  setSelectedTables,
  setConnectorData, unsetTablePreviewData, setSelectedTablesFiltered, setLinksFiltered, setSemantycLayerName
} from '../reducers/schemaDesigner';

export const getConnectorObjectsList = queryParams => {
  return async dispatch => {
    try {
      const response = await request({
        func: 'CONNECT.GET_OBJECTS_LIST',
        params: queryParams, // { connect_id: id }
        dispatch
      });
      if (response?.success) {
        dispatch(setConnectorObjects(response.result));
      }
    } catch (err) {
      dispatch(
        notificationShown({ message: err.message, messageType: 'error' })
      );
    }
  };
};

export const getObjectFields = queryParams => {
  return async dispatch => {
    try {
      const response = await request({
        func: 'CONNECT.GET_OBJECT_FIELDS',
        params: queryParams, // {"schema":"TA_APP","object_name":"MR_D_OPTIONS","object_type_id":1,"connect_id":4}
        dispatch
      });
      if (response?.success) {
        dispatch(
          setSelectedTables({
            [getTableIdFromParams(queryParams)]: response.result
          })
        );
      }
    } catch (err) {
      dispatch(
        notificationShown({ message: err.message, messageType: 'error' })
      );
    }
  };
};

export const getObjectData = queryParams => {
  return async dispatch => {
    try {
      const response = await request({
        func: 'CONNECT.GET_OBJECT_DATA',
        params: queryParams, // {"schema":"TA_APP","object_name":"MR_D_OPTIONS","object_type_id":1,"connect_id":4}
        dispatch
      });
      if (response?.success) {
        dispatch(setConnectorData(response.result));
      }
    } catch (err) {
      dispatch(
        notificationShown({ message: err.message, messageType: 'error' })
      );
    }
  };
};

export const clearTablePreview = () => {
  return dispatch => dispatch(unsetTablePreviewData());
}

export const filterSelectedTables = (filteredTables) => {
  return dispatch => dispatch(setSelectedTablesFiltered(filteredTables));
}

export const filterTablesLinks = (filteredLinks) => {
  return dispatch => dispatch(setLinksFiltered(filteredLinks));
}

export const setSemantycLayerDataName = (name) => {
  return dispatch => dispatch(setSemantycLayerName(name));
}