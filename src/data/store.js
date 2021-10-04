import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/auth';
import uiReducer from './reducers/ui';
import notificationsReducer from './reducers/notifications';
import dataReducer from './reducers/data';
import reportDesignerReducer from './reducers/reportDesigner';

const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    notifications: notificationsReducer,
    data: dataReducer,
    reportDesigner: reportDesignerReducer
  }
});

export default store;
