import { request } from '../helpers';
import { login, logout } from '../reducers/auth';
import { notificationShown } from '../reducers/notifications';

export const loginUser = queryParams => {
  // return async dispatch => {
  //   try {
  //     const response = await requestAuth({
  //       params: queryParams,
  //       dispatch
  //     });
  //     if (response) {
  //       if (response.success) {
  //         localStorage.setItem('isAuth', 'true');
  //         localStorage.setItem('userInfo', JSON.stringify(response.userInfo));
  //         dispatch(login(response.userInfo));
  //       } else {
  //         throw Error(response.errorText);
  //       }
  //     }
  //   } catch (err) {
  //     dispatch(
  //       notificationShown({ message: err.message, messageType: 'error' })
  //     );
  //   }
  // };
  return async dispatch => {
    try {
      const response = await request({
        code: 'CMS.LOGIN',
        params: queryParams,
        dispatch
      });
      console.log('response on login: ', response);
      if (response) {
        dispatch(login(response));
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
