/* eslint-disable camelcase */
import { getTableIdFromParams, request } from '../helpers';
import { notificationShown } from '../reducers/notifications';
import {
  setConnectorObjects,
  setSelectedTables
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
        dispatch(setConnectorObjects(response.result));
      }
    } catch (err) {
      dispatch(
        notificationShown({ message: err.message, messageType: 'error' })
      );
    }
  };
};
