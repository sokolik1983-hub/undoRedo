// eslint-disable-next-line import/no-cycle
import { requestAuth } from '../helpers';
import { login, logout } from '../reducers/auth';
// eslint-disable-next-line import/no-cycle
import { notificationShown } from '../reducers/notifications';
// eslint-disable-next-line import/no-cycle
import { getDictionaries } from './app';

export const loginUser = queryParams => {
  return async dispatch => {
    try {
      const response = await requestAuth({
        params: queryParams,
        dispatch
      });
      if (response) {
        if (response.success) {
          localStorage.setItem('isAuth', 'true');
          localStorage.setItem('userInfo', JSON.stringify(response.userInfo));
          dispatch(login(response.userInfo));
          dispatch(getDictionaries())
        } else {
          throw Error(response.errorText);
        }
      }
    } catch (err) {
      dispatch(
        notificationShown({ message: err.message, messageType: 'error' })
      );
    }
  };
};

export const logoutUser = () => {
  return async dispatch => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('isAuth');
    dispatch(logout());
  };
};
