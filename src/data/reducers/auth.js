import { createSlice } from '@reduxjs/toolkit';

function getAuthState() {
  const userInfo = window.localStorage.getItem('userInfo');
  const isAuth = window.localStorage.getItem('isAuth');

  if (isAuth) {
    return {
      isAuth: true,
      userInfo
    };
  }

  return {
    isAuth: false,
    userInfo: {}
  };
}

const auth = createSlice({
  name: 'auth',
  initialState: getAuthState(),
  reducers: {
    login: (state, action) => {
      state.isAuth = true;
      state.userInfo = action.payload;
    },
    logout: state => {
      state.isAuth = false;
      state.userInfo = {};
    },
    refresh: state => {
      state.isAuth = true;
    },
    getAuth: state => {
      const { isAuth, userInfo } = getAuthState();
      state.isAuth = isAuth;
      state.userInfo = userInfo;
    },
    serverResponse: (state, action) => {
      state.serverResponse = action.payload;
    }
  }
});

export const { login, logout, refresh, getAuth, serverResponse } = auth.actions;

export default auth.reducer;
