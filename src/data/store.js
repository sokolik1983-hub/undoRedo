import { configureStore } from '@reduxjs/toolkit';
// import moment from 'moment';
// import authReducer from './reducers/auth';
// import auditReducer from './reducers/audit';
// import uiReducer from './reducers/ui';
// import notificationsReducer from './reducers/notifications';
// import dataReducer from './reducers/data';
// import reportDesignerReducer from './reducers/new_reportDesigner';
import appReducer from './reducers/root';

const store = configureStore({
  reducer: {
    // auth: authReducer,
    // audit: auditReducer,
    // ui: uiReducer,
    // notifications: notificationsReducer,
    // data: dataReducer,
    // reportDesigner: reportDesignerReducer,
    app: appReducer
  }
});

export default store;
