import { request } from '../helpers';
import { login, logout, serverResponse } from '../reducers/auth';

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
  console.log(queryParams);
  return async dispatch => {
    const response = await request({
      code: 'CMS.LOGIN',
      params: queryParams,
      dispatch
    });
    if (response) {
      console.log('response',response);
      if (response.result === true) {
        localStorage.setItem('isAuth', 'true');
        localStorage.setItem('userInfo', queryParams.username);
        localStorage.setItem('token', response.token)
      }
      dispatch(login(response));
    }
  };
};

export const logoutUser = () => {
  return async dispatch => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('isAuth');
    localStorage.removeItem('token');
    dispatch(logout());
  };
};

export const testNewFunc = queryParams => {
  const token = localStorage.getItem('token');
  console.log(queryParams.token);
  return async dispatch => {
    const response = await request({
      code: queryParams.code,
      params: queryParams.params,
      token,
      dispatch
    });
    if (response) {
      if (response.result === 'true') {
        dispatch(serverResponse(response))
      }
    }
  };
}
