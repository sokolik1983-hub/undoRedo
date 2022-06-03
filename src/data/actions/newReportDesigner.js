/* eslint-disable no-unused-vars */
import { ActionCreators } from 'redux-undo';
import { request } from '../helpers';
import { setStructure, setVariables } from '../reducers/new_reportDesigner';
import { REP_GET_REPORT_STRUCTURE, REP_GET_VARIABLES } from './response_const';

export const refreshServerResponse = queryParams => {
  return async dispatch => {
    await request({
      code: 'REP.REBOOT',
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
      if (response.result === true) {
        localStorage.setItem('streamreceiver', response.thread);
      }
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
      if (response.result === true) {
        dispatch(setStructure(response.structure));
      }
    }
  };
};

export const getElementData = (queryParams, callback) => {
  // token:{{lastToken}}
  // params:{"report_id": "R1", "element_id": "R1.B.2.HB" }
  // streamreceiver:{{lastThread}}

  return async dispatch => {
    const response = await request({
      code: 'REP.GET_ELEMENT_DATA',
      params: queryParams,
      dispatch
    });
    if (response) {
      if (response.result === true) {
        callback(response);
        // dispatch(setStructure(response.structure));
      }
    }
  };
};

export const getVariables = () => {
  return async dispatch => {
    //  dispatch(setVariables(REP_GET_VARIABLES.variables));

    const response = await request({
      code: 'REP.GET_VARIABLES',
      params: {},
      dispatch
    });

    if (response) {
      if (response.result === true) {
        dispatch(setVariables(response.variables));
      }
    }
  };
};

export const handleUndo = () => {
  return dispatch => dispatch(ActionCreators.undo());
};

export const handleRedo = () => {
  return dispatch => dispatch(ActionCreators.redo());
};
