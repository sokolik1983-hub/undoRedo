import { configureStore } from '@reduxjs/toolkit';

import appReducer from './reducers/root';

const store = configureStore({
  reducer: {
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
