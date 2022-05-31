import { ActionCreators } from 'redux-undo';
import { request } from '../helpers';
import {setStructure} from "../reducers/new_reportDesigner"

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

}

export const getReportStructure = queryParams => {
  return async dispatch => {
    const response = await request({
      code: 'REP.GET_REPORT_STRUCTURE',
      params: queryParams,
      dispatch
    });
    if (response) {

      if (response.result === true) {
       
        dispatch(setStructure(response.structure))
      }
      
    }
  };

}




export const handleUndo = () => {
  return dispatch => dispatch(ActionCreators.undo());
};

export const handleRedo = () => {
  return dispatch => dispatch(ActionCreators.redo());
};
