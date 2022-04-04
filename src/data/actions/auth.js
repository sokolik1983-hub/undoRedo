import { request } from '../helpers';
import { login, logout } from '../reducers/auth';

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
    const response = await request({
      code: 'CMS.LOGIN',
      params: queryParams,
      dispatch
    });
    if (response) {
      if (response.result === 'true') {
        localStorage.setItem('isAuth', 'true');
        localStorage.setItem('userInfo', queryParams.username);
      }
      dispatch(login(response));
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
