import { AnyAction, combineReducers } from 'redux';

import authReducer from '../auth/reducers/auth';
import auditReducer from './audit';
import dataReducer from './data';
// import reportDesignerReducer from './reportDesigner';
import reportDesignerReducer from './new_reportDesigner';
import notificationsReducer from './notifications';
import schemaDesignerReducer from './schemaDesigner';
import trashReducer from './trash';
import uiReducer from './ui';

const appReducer = combineReducers({
  auth: authReducer,
  audit: auditReducer,
  ui: uiReducer,
  notifications: notificationsReducer,
  data: dataReducer,
  reportDesigner: reportDesignerReducer,
  trash: trashReducer,
  schemaDesigner: schemaDesignerReducer,
});

const rootReducer = (state: any, action: AnyAction) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === 'auth/logout') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
