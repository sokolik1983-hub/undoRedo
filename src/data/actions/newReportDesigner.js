import { ActionCreators } from 'redux-undo';

import { TOAST_TYPE } from '../../common/constants/common';
import { getCurrentReport } from '../../modules/ReportDesigner/helpers';
import { request } from '../helpers';
import {
  setQueryData,
  setQueryPanelData,
  setQueryResult,
  setReportDisplayMode,
  setReportHeader,
  setReports,
  setStructure,
  setSymanticLayerQueryResult,
  setVariables,
} from '../reducers/new_reportDesigner';
import { showToast } from './app';

export const refreshServerResponse = (queryParams) => {
  return async (dispatch) => {
    await request({
      code: 'REP.REBOOT',
      token: localStorage.getItem('token'),
      params: queryParams,
      dispatch,
    });
  };
};

export const getStreamReceiever = (queryParams) => {
  return async (dispatch) => {
    const response = await request({
      code: 'REP.OPEN_FILE',
      params: queryParams,
      dispatch,
    });
    if (response) {
      localStorage.setItem('streamreceiver', response.header.thread);
    }
  };
};

export const getReportStructure = (queryParams) => {
  return async (dispatch) => {
    const response = await request({
      code: 'REP.GET_REPORT_STRUCTURE',
      params: queryParams,
      dispatch,
    });
    if (response) {
      dispatch(setStructure(response.structure));
    }
  };
};

export const createReport = (queryParams, onSuccess) => {
  return async (dispatch) => {
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
};
export const saveReport = (queryParams, onSuccess) => {
  return async (dispatch, getState) => {
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
};
export const openReport = (queryParams) => {
  return async (dispatch) => {
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
};
export const deleteReport = (queryParams, onSuccess) => {
  return async (dispatch) => {
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
};
export const getReportTabs = (queryParams) => {
  return async (dispatch) => {
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
};
export const setReportDp = (queryParams) => {
  return async (dispatch) => {
    const response = await request({
      code: 'REP.SET_DP',
      params: queryParams,
      dispatch,
    });
    if (response) {
      dispatch(setReportDpRefreshed());
    }
  };
};
export const setReportDpRefreshed = (queryParams) => {
  return async (dispatch) => {
    const response = await request({
      code: 'REP.REFRESH',
      params: queryParams,
      dispatch,
    });
    if (response) {
      console.log(response);
      dispatch(getVariables());
    }
  };
};

export const setReportStructure = (queryParams) => {
  console.log(queryParams);
  return async (dispatch) => {
    const response = await request({
      code: 'REP.SET_STRUCTURE',
      params: queryParams,
      dispatch,
    });
    if (response) {
      dispatch(getReportStructure({ report_id: queryParams.report_id }));
    }
  };
};
export const setStructureBeforeGetData = (queryParams) => {
  return async (dispatch) => {
    await dispatch(setReportStructure(queryParams.structure));
    dispatch(setReportDisplayMode(queryParams.mode));
  };
};

export const getElementData = (queryParams, callback) => {
  return async (dispatch) => {
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
};

export const getVariables = () => {
  return async (dispatch) => {
    const response = await request({
      code: 'REP.GET_VARIABLES',
      params: {},
      dispatch,
    });

    if (response) {
      dispatch(setVariables(response.variables));
    }
  };
};

export const handleUndo = () => {
  return (dispatch) => dispatch(ActionCreators.undo());
};

export const handleRedo = () => {
  return (dispatch) => dispatch(ActionCreators.redo());
};

export const getQueryPanelSymanticLayerData = (id) => async (dispatch) => {
  const response = await request({
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

export const createQuery = (queryParams) => async (dispatch) => {
  const response = await request({
    code: 'UNV.GET_SQL',
    params: queryParams,
    dispatch,
  });

  if (response) {
    dispatch(setQueryData(response));
  }
};

export const semanticLayerDataQuery = (queryParams) => async (dispatch) => {
  const response = await request({
    func: 'CONNECT.START_SQL',
    params: queryParams,
    dispatch,
  });
  if (response?.success) {
    dispatch(setSymanticLayerQueryResult(response.result));
  }
};

// TODO: удалить getResultFromQuery если нигде не используется
export const getResultFromQuery = (queryParams) => async (dispatch) => {
  const response = await request({
    code: 'CN.GET_DATA',
    params: queryParams,
    dispatch,
  });

  if (response) {
    dispatch(setQueryResult(response));
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

// TODO: удалить postQueryPanelTab если больше нигде не используется
export const postQueryPanelTab = (queryParams) => async (dispatch) => {
  const response = await request({
    code: 'REP.SET_DP',
    params: queryParams,
    dispatch,
  });

  if (response) {
    dispatch(setReportDpRefreshed());
  }

  console.log(response);
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
