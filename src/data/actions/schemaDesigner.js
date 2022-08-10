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
  setTablePreviewData,
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

/**
 * Запрос предварительного просмотра таблицы в дизайнере юниверсов
 *
 * id  int  Y  Идентификатор существующего соединения
 *
 * dataType  string  Y  Тип запрашиваемой информации (Table / Field / Query)
 *
 * catalog  string  N  Каталог (база) объекта (Table, Field)
 *
 * schema  string  N  Схема(собственник) объекта (Table, Field)
 *
 * objectName  string  N  Имя объекта (Table, Field)
 *
 * fieldName  string  N  Имя поля  (Field)
 *
 * query  string  N  Запрос (Query)
 *
 * isDistinct  int  N  Признак (1/0) надо ли запрашивать только уникальные значения (Table, Field)
 *
 * maxRows  int  Y  Максимальное кол-во строк для возврата

 */

export const getTablePreview = (queryParams) => {
  return async (dispatch) => {
    const response = await request({
      code: 'CN.GET_DATA',
      params: queryParams,
      dispatch,
    });
    if (response?.result) {
      dispatch(setConnectorData(response));
    }
  };
};

export const setPreviewTableData = (params) => {
  return (dispatch) => dispatch(setTablePreviewData(params));
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
