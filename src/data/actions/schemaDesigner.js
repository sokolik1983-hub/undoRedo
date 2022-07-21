import * as universe from '../../common/constants/universe_10040_v2.json';
import { getTableIdFromParams, request } from '../helpers';
import {
  setConnectorData,
  setConnectorObjects,
  setLinksFiltered,
  setSchemaDesigner,
  setSelectedTables,
  setSelectedTablesArray,
  setSelectedTablesFiltered,
  setSemantycLayerName,
  unsetTablePreviewData,
} from '../reducers/schemaDesigner';

export const getObjectFields = (queryParams) => {
  return async (dispatch) => {
    const response = await request({
      code: 'CN.GET_OBJECT_FIELDS',
      params: queryParams, // {"schema":"TA_APP","object_name":"MR_D_OPTIONS","object_type_id":1,"connect_id":4}
      dispatch,
    });
    if (response?.result) {
      dispatch(
        setSelectedTables({
          [getTableIdFromParams(queryParams)]: response.data,
        }),
      );
      dispatch(
        setSelectedTablesArray({
          name: getTableIdFromParams(queryParams),
          fields: response.data,
        }),
      );
    }
  };
};

export const getObjectData = (queryParams) => {
  return async (dispatch) => {
    const response = await request({
      func: 'CN.GET_OBJECT_DATA',
      params: queryParams, // {"schema":"TA_APP","object_name":"MR_D_OPTIONS","object_type_id":1,"connect_id":4}
      dispatch,
    });
    if (response?.success) {
      dispatch(setConnectorData(response.description));
    }
  };
};

export const clearTablePreview = () => {
  return (dispatch) => dispatch(unsetTablePreviewData());
};

export const filterSelectedTables = (filteredTables) => {
  return (dispatch) => dispatch(setSelectedTablesFiltered(filteredTables));
};

export const filterTablesLinks = (filteredLinks) => {
  return (dispatch) => dispatch(setLinksFiltered(filteredLinks));
};

export const setSemantycLayerDataName = (name) => {
  return (dispatch) => dispatch(setSemantycLayerName(name));
};
