import { delay } from 'lodash';

import { REDIRECT_LINKS } from '../../common/constants/common';
import { request, requestWithoutResponse } from '../helpers';
import { AppDispatch, RootState } from '../store';
import { login, logout } from './authReducers';
import { ICmsLoginQueryParams, ICmsLoginRes } from './authTypes';

export const refreshUserSession =
  (queryParams: string) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const timer = setInterval(async () => {
      const { isAuth } = getState().app.auth;
      if (!isAuth) {
        clearInterval(timer);
      }
      const response = await requestWithoutResponse({
        code: 'CMS.ALIVE',
        params: queryParams,
        dispatch,
      });
      if (response) {
        return null;
      }
      return null;
    }, 1800000);
  };

export const loginUser =
  (queryParams: ICmsLoginQueryParams) => async (dispatch: AppDispatch) => {
    const response = await request<ICmsLoginQueryParams, ICmsLoginRes>({
      code: 'CMS.LOGIN',
      params: queryParams,
      dispatch,
    });
    if (response?.result) {
      localStorage.setItem('isAuth', 'true');
      localStorage.setItem('userInfo', queryParams.userName);
      localStorage.setItem('token', response.token);
      dispatch(login(response));
      dispatch(refreshUserSession(response.token));
    }
  };

export const logoutUser = () => async (dispatch: AppDispatch) => {
  await requestWithoutResponse({
    code: 'REP.REBOOT',
    token: localStorage.getItem('token') as string,
    params: {
      token: localStorage.getItem('token'),
    },
    dispatch,
  });
  delay(async () => {
    await requestWithoutResponse({
      code: 'CMS.LOGOUT',
      token: localStorage.getItem('token') as string,
      params: null,
      dispatch,
    });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('isAuth');
    localStorage.removeItem('token');
    localStorage.removeItem('streamreceiver');
    window.location.pathname = REDIRECT_LINKS.LOGIN_PAGE;
    dispatch(logout());
  }, 1000);
};
