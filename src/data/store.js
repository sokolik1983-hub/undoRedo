import {configureStore} from '@reduxjs/toolkit';

import appReducer from './reducers/root';

const store = configureStore({
    reducer: {
        app: appReducer,
    },
});

export default store;
