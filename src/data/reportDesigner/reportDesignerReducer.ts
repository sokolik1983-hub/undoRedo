import { combineReducers } from 'redux';
import undoable from 'redux-undo';

import { queryPanelData } from './queryPanelData/queryPanelDataReducer';
import { reportsData } from './reportsData/reportsDataReducer';
import { reportDesignerUI } from './reportsUi/reportDesignerUIReducer';

export default combineReducers({
  reportsUi: reportDesignerUI.reducer,
  reportsData: undoable(reportsData.reducer),
  queryPanelData: queryPanelData.reducer,
});
