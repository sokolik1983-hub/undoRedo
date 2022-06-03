import { REDIRECT_LINKS } from '../../common/constants/common';
import { request, requestWithoutResponse } from '../helpers';
import { login, logout } from '../reducers/auth';

export const loginUser = queryParams => {
  return async dispatch => {
    const response = await request({
      code: 'CMS.LOGIN',
      params: queryParams,
      dispatch
    });
    if (response) {
      if (response.result === true) {
        localStorage.setItem('isAuth', 'true');
        localStorage.setItem('userInfo', queryParams.username);
        localStorage.setItem('token', response.token);
      }
      dispatch(login(response));
    }
  };
};

export const logoutUser = () => {
  return async dispatch => {
    await requestWithoutResponse({
      code: 'REP.REBOOT',
      params: {
        token: localStorage.getItem('token')
      },
      dispatch
    });
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
    window.location.pathname = REDIRECT_LINKS.LOGIN_PAGE;
  };
};
