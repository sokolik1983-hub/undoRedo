import { combineReducers } from 'redux';
import authReducer from './auth';
import auditReducer from './audit';
import uiReducer from './ui';
import notificationsReducer from './notifications';
import dataReducer from './data';
import reportDesignerReducer from './reportDesigner';
import trashReducer from './trash';

const appReducer = combineReducers({
  auth: authReducer,
  audit: auditReducer,
  ui: uiReducer,
  notifications: notificationsReducer,
  data: dataReducer,
  reportDesigner: reportDesignerReducer,
  trash: trashReducer
});

const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === 'auth/logout') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
