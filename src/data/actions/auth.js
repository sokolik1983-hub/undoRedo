import { requestAuth } from '../helpers';
import { login, logout } from '../reducers/auth';
import { showNotification } from '../reducers/notifications';

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
        } else {
          throw Error(response.errorText);
        }
      }
    } catch (err) {
      dispatch(
        showNotification({ message: err.message, messageType: 'error' })
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
