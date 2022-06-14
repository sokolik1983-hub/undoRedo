// eslint-disable-next-line import/no-cycle
/* eslint-disable no-unused-vars */
import { delay } from 'lodash';
import { REDIRECT_LINKS } from '../../common/constants/common';
import { request, requestWithoutResponse } from '../helpers';
import { login, logout } from '../reducers/auth';

export const refreshUserSession = queryParams => {
  return async (dispatch, getState) => {
    const timer = setInterval(async () => {
      const { isAuth } = getState().app.auth;
      if (!isAuth) {clearInterval(timer)}
      const response = await requestWithoutResponse({
        code: 'CMS.ALIVE',
        params: queryParams,
        dispatch
      });
      if (response) {
        return null;
      }
      return null;
    }, 1800000);
  };
};

export const loginUser = queryParams => {
  return async dispatch => {
    const response = await request({
      code: 'CMS.LOGIN',
      params: queryParams,
      dispatch
    });
    localStorage.setItem('isAuth', 'true');
    localStorage.setItem('userInfo', queryParams.username);
    localStorage.setItem('token', response.token);
    dispatch(login(response));
    dispatch(refreshUserSession(response.token))
  };
};

export const logoutUser = () => {
  return async dispatch => {
    await requestWithoutResponse({
      code: 'REP.REBOOT',
      token: localStorage.getItem('token'),
      params: {
        token: localStorage.getItem('token')
      },
      dispatch
    });
    delay(async () => {
      await requestWithoutResponse({
        code: 'CMS.UNLOGIN',
        token: localStorage.getItem('token'),
        params: null,
        dispatch
      });
      localStorage.removeItem('userInfo');
      localStorage.removeItem('isAuth');
      localStorage.removeItem('token');
      dispatch(logout());
    }, 3000);
  };
};

