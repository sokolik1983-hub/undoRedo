/* eslint-disable no-unused-vars */
import { ActionCreators } from 'redux-undo';
import { request } from '../helpers';
import { setStructure, setVariables } from '../reducers/new_reportDesigner';

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
      localStorage.setItem('streamreceiver', response.thread);
    }
  };
};

export const getReportStructure = queryParams => {
  return async dispatch => {
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

export const createReport = queryParams => {
  return async dispatch => {
    const response = await request({
      code: 'REP.CREATE',
      params: queryParams,
      dispatch
    });
    if (response) {
      console.log(response);
      // dispatch(getReportStructure({ report_id: queryParams.report_id }));
    }
  };
};
export const saveReport = queryParams => {
  return async dispatch => {
    const response = await request({
      code: 'REP.SAVE',
      params: queryParams, // {"name" : "сложное уникальное имя", "parent_id' : 15}
      dispatch
    });
    if (response) {
      console.log(response);
      // dispatch(getReportStructure({ report_id: queryParams.report_id }));
    }
  };
};
export const openReport = queryParams => {
  return async dispatch => {
    const response = await request({
      code: 'REP.OPEN',
      params: queryParams, // {"id": 10106}
      dispatch
    });
    if (response) {
      console.log(response);
      // dispatch(getReportStructure({ report_id: queryParams.report_id }));
    }
  };
};
export const getReportTabs = queryParams => {
  return async dispatch => {
    const response = await request({
      code: 'REP.GET_ALL_OBJECT',
      params: queryParams, // {"id": 10106}
      dispatch
    });
    if (response) {
      console.log(response);
      // dispatch(getReportStructure({ report_id: queryParams.report_id }));
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
