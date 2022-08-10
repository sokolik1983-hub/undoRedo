import { AnyAction, combineReducers } from 'redux';

import authReducer from './auth/authReducers';
import auditReducer from './reducers/audit';
import dataReducer from './reducers/data';
import notificationsReducer from './reducers/notifications';
import schemaDesignerReducer from './reducers/schemaDesigner';
import trashReducer from './reducers/trash';
import uiReducer from './reducers/ui';
import reportDesignerReducer from './reportDesigner/reportDesignerReducer';

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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rootReducer = (state: any, action: AnyAction) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === 'auth/logout') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
