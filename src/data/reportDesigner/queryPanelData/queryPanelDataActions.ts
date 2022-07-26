// @ts-nocheck
import { request } from '../../helpers';
import { AppDispatch } from '../../store';
import { setReportDpRefreshed } from '../reportsData/reportsDataActions';
import {
  setQueryData,
  setQueryPanelData,
  setQueryResult,
  setSymanticLayerQueryResult,
} from './queryPanelDataReducer';
import {
  IUnvGetDataQpRes,
  IUnvGetSqlQueryParams,
  IUnvGetSqlQueryRes,
} from './queryPanelDataTypes';

export const getQueryPanelSymanticLayerData =
  (id: number) => async (dispatch: AppDispatch) => {
    const response = await request<{ id: number }, IUnvGetDataQpRes>({
      code: 'UNV.GET_DATA_QP',
      params: { id },
      dispatch,
    });

    if (response) {
      dispatch(
        setQueryPanelData({
          universeId: id,
          data: response.qpData,
        }),
      );
    }
  };

export const createQuery =
  (queryParams: IUnvGetSqlQueryParams) => async (dispatch: AppDispatch) => {
    const response = await request<IUnvGetSqlQueryParams, IUnvGetSqlQueryRes>({
      code: 'UNV.GET_SQL',
      params: queryParams,
      dispatch,
    });

    if (response) {
      dispatch(setQueryData(response));
    }
  };

export const createQueryAndGetResult =
  (createQueryParams, getResultParams) => async (dispatch) => {
    const createQueryResponse = await request({
      code: 'UNV.GET_SQL',
      params: createQueryParams,
      dispatch,
    });

    if (createQueryResponse) {
      dispatch(setQueryData(createQueryResponse));

      const getResultResponse = await request({
        code: 'CN.GET_DATA',
        params: { ...getResultParams, query: createQueryResponse.dpSql },
        dispatch,
      });

      if (getResultResponse) {
        dispatch(setQueryResult(getResultResponse));
      }
    }
  };

export const createQueryAndPostQueryPanelTab =
  (createQueryParams, postParams) => async (dispatch) => {
    const createQueryResponse = await request({
      code: 'UNV.GET_SQL',
      params: createQueryParams,
      dispatch,
    });

    if (createQueryResponse) {
      dispatch(setQueryData(createQueryResponse));

      const postQueryPanelTabResponse = await request({
        code: 'REP.SET_DP',
        params: {
          ...postParams,
          dp: { ...postParams.dp, dpSql: createQueryResponse.dpSql },
        },
        dispatch,
      });

      if (postQueryPanelTabResponse) {
        dispatch(setReportDpRefreshed());
      }
    }
  };

// remove if not needed or useless
export const semanticLayerDataQuery = (queryParams) => async (dispatch) => {
  const response = await request({
    code: 'CONNECT.START_SQL',
    params: queryParams,
    dispatch,
  });
  if (response?.success) {
    dispatch(setSymanticLayerQueryResult(response.result));
  }
};
