/* eslint-disable no-unused-vars */
import { ActionCreators } from 'redux-undo';
import { request } from '../helpers';
import { setStructure, setVariables } from '../reducers/new_reportDesigner';
import {
  REP_GET_ELEMENT_DATA,
  REP_GET_REPORT_STRUCTURE,
  REP_GET_VARIABLES
} from './response_const';

export const refreshServerResponse = queryParams => {
  return async dispatch => {
    await request({
      code: 'REP.REBOOT',
      token: localStorage.getItem('token'),
      params: queryParams,
      dispatch
    });
  };
};

export const getStreamReceiever = queryParams => {
  return async dispatch => {
    const response = await request({
      code: 'REP.OPEN_FILE',
      params: queryParams,
      dispatch
    });
    if (response) {
      localStorage.setItem('streamreceiver', response.header.thread);
    }
  };
};

export const getReportStructure = queryParams => {
  return async dispatch => {
    // dispatch(setStructure(REP_GET_REPORT_STRUCTURE.structure));

    const response = await request({
      code: 'REP.GET_REPORT_STRUCTURE',
      params: queryParams,
      dispatch
    });
    if (response) {
      dispatch(setStructure(response.structure));
    }
  };
};

export const setReportStructure = queryParams => {
  return async dispatch => {
    const response = await request({
      code: 'REP.SET_STRUCTURE',
      params: queryParams,
      dispatch
    });
    if (response) {
      dispatch(getReportStructure({ report_id: queryParams.report_id }));
    }
  };
};

export const getElementData = (queryParams, callback) => {
  // token:{{lastToken}}
  // params:{"report_id": "R1", "element_id": "R1.B.2.HB" }
  // streamreceiver:{{lastThread}}
  // return async dispatch => {
  //   dispatch(setStructure(REP_GET_ELEMENT_DATA.data));
  // };
  return async dispatch => {

    const response = await request({
      code: 'REP.GET_ELEMENT_DATA',
      params: queryParams,
      dispatch
    });
    
    if (response) {
      callback(response);
      // dispatch(setStructure(response.structure));
    }
  };
};

export const getVariables = () => {
  return async dispatch => {
    // dispatch(setVariables(REP_GET_VARIABLES.variables));

    const response = await request({
      code: 'REP.GET_VARIABLES',
      params: {},
      dispatch
    });

    if (response) {
      dispatch(setVariables(response.variables));
    }
  };
};

export const handleUndo = () => {
  return dispatch => dispatch(ActionCreators.undo());
};

export const handleRedo = () => {
  return dispatch => dispatch(ActionCreators.redo());
};

/**
 * Получение документов, добавленных в Избранные.
 */
 export const getDocumentsFavorites = () => {
  return async dispatch => {
    const response = await request({
      code: 'CMS.USER.GET_FAVORITES',
      params: {user_id: 10001},
      dispatch
    });
    if (response) {
      console.log('response', response)
    }
  };
};

/**
 * Добавление документы в Избранные.
 *
 * @prop queryParams Параметры (id добавляемого документа).
 */
export const setDocumentToFavorites = userId => {
  return async dispatch => {
    const response = await request({
      code: 'CMS.USER.SET_FAVORITE',
      params: userId,
      dispatch
    });
    if (response) {
      console.log('response', response)
    }
  };
};