// @ts-nocheck
import { ActionCreators } from 'redux-undo';

import { TOAST_TYPE } from '../../../common/constants/common';
import { getCurrentReport } from '../../../modules/ReportDesigner/helpers';
import { showToast } from '../../actions/app';
import { request } from '../../helpers';
import {
  setReportDisplayMode,
  setReportHeader,
  setReports,
  setStructure,
  setVariables,
} from './reportsDataReducer';

export const setReportStructure = (queryParams) => async (dispatch) => {
  const response = await request({
    code: 'REP.SET_REPORT_STRUCTURE',
    params: queryParams,
    dispatch,
  });
  if (response) {
    dispatch(getReportStructure({ report_id: queryParams.report_id }));
  }
};

export const getReportStructure = (queryParams) => async (dispatch) => {
  const response = await request({
    code: 'REP.GET_REPORT_STRUCTURE',
    params: queryParams,
    dispatch,
  });
  if (response) {
    dispatch(setStructure(response.structure));
  }
};

export const saveReport =
  (queryParams, onSuccess) => async (dispatch, getState) => {
    const state = getState();
    const { reportDesigner } = state.app;
    const currentReport = getCurrentReport(
      reportDesigner.reportsData.present.reports,
      reportDesigner.reportsData.present.activeReport,
    );
    await dispatch(
      setReportStructure({
        report_id: currentReport.id,
        structure: currentReport.structure,
      }),
    );

    const response = await request({
      code: 'REP.SAVE',
      params: queryParams, // {"name" : "сложное уникальное имя", "parent_id' : 15}
      dispatch,
    });
    if (response) {
      dispatch(showToast(TOAST_TYPE.SUCCESS, 'Отчет успешно сохранен!'));
      if (queryParams.folder_id) {
        // onSuccess(response.header.id);
        await dispatch(setReportHeader(response.header));
      }
    }
  };

export const setReportDpRefreshed = (queryParams) => async (dispatch) => {
  const response = await request({
    code: 'REP.REFRESH',
    params: queryParams,
    dispatch,
  });
  if (response) {
    dispatch(getVariables());
  }
};

export const openReport = (queryParams) => async (dispatch) => {
  const response = await request({
    code: 'REP.OPEN',
    params: queryParams, // {"id": 10106}
    dispatch,
  });
  if (response) {
    localStorage.setItem('streamreceiver', response.header.thread);
    dispatch(setReportDpRefreshed());
    await dispatch(setReportHeader(response.header));
    await dispatch(getReportTabs());
    await dispatch(getVariables());
  }
};

export const setStructureBeforeGetData = (queryParams) => async (dispatch) => {
  await dispatch(setReportStructure(queryParams.structure));
  dispatch(setReportDisplayMode(queryParams.mode));
};

// TODO: remove if useless
export const getReportTabs = (queryParams) => async (dispatch) => {
  const response = await request({
    code: 'REP.GET_ALL_OBJECT',
    params: queryParams,
    dispatch,
  });
  if (response) {
    dispatch(
      setReports({
        reports: response.object.data.reports.map((report) => {
          return {
            ...report,
            paginationMode: 'Quick', // Quick | ?
            displayMode: 'Structure', // Data | Structure
            pageSettings: {
              margins: {
                left: 100,
                right: 100,
                top: 100,
                bottom: 100,
              },
              orientation: 'Landscape', // Landscape | Portrait
              height: 1024,
              width: 768,
              recordsHeight: 100,
              recordsWidth: 25,
              scale: 100,
            },
          };
        }),
      }),
    );
    // dispatch(getReportStructure({ report_id: queryParams.report_id }));
  }
};

export const getVariables = () => async (dispatch) => {
  const response = await request({
    code: 'REP.GET_VARIABLES',
    params: {},
    dispatch,
  });

  if (response) {
    dispatch(setVariables(response.variables));
  }
};

export const createReport = (queryParams, onSuccess) => async (dispatch) => {
  const response = await request({
    code: 'REP.CREATE',
    params: queryParams,
    dispatch,
  });
  if (response) {
    localStorage.setItem('streamreceiver', response.header.thread);
    dispatch(getVariables());
  }
};

export const getElementData = (queryParams, callback) => async (dispatch) => {
  const response = await request({
    code: 'REP.GET_ELEMENT_DATA',
    params: queryParams,
    dispatch,
  });

  if (response) {
    callback(response);
    // dispatch(setStructure(response.structure));
  }
};

export const getStreamReceiever = (queryParams) => async (dispatch) => {
  const response = await request({
    code: 'REP.OPEN_FILE',
    params: queryParams,
    dispatch,
  });
  if (response) {
    localStorage.setItem('streamreceiver', response.header.thread);
  }
};

export const refreshServerResponse = (queryParams) => async (dispatch) => {
  await request({
    code: 'REP.REBOOT',
    token: localStorage.getItem('token'),
    params: queryParams,
    dispatch,
  });
};

export const handleUndo = () => (dispatch) => dispatch(ActionCreators.undo());

export const handleRedo = () => (dispatch) => dispatch(ActionCreators.redo());

export const deleteReport = (queryParams, onSuccess) => async (dispatch) => {
  const response = await request({
    code: 'REPOS.DEL_USER_OBJ',
    params: queryParams, // {"name" : "сложное уникальное имя", "parent_id' : 15}
    dispatch,
  });
  if (response) {
    dispatch(showToast(TOAST_TYPE.SUCCESS, 'Отчет успешно удален!'));
    onSuccess();
  }
};

// TODO: remove if useless
export const setReportDp = (queryParams) => async (dispatch) => {
  const response = await request({
    code: 'REP.SET_DP',
    params: queryParams,
    dispatch,
  });
  if (response) {
    dispatch(setReportDpRefreshed());
  }
};
