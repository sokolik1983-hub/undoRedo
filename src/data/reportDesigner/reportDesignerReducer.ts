import { combineReducers } from 'redux';

import { queryPanelData } from './queryPanelData/queryPanelDataReducer';
import { reportsData } from './reportsData/reportsDataReducer';
import { reportDesignerUI } from './reportsUi/reportDesignerUIReducer';

export default combineReducers({
  reportsUi: reportDesignerUI.reducer,
  reportsData: reportsData.reducer,
  queryPanelData: queryPanelData.reducer,
});
