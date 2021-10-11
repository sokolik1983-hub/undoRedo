import axios from 'axios';
import lodash from 'lodash';
import { SERVER_API_URL } from '../common/constants/config';
import { showNotification } from './reducers/notifications';
import { setLoadingData } from './reducers/ui';

export const request = async ({ type = 'request', params, func, dispatch }) => {
  try {
    dispatch(setLoadingData(true));
    const response = await axios({
      method: 'post',
      url: `${SERVER_API_URL}${type}?`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      withCredentials: true,
      data: `function=${func}&format=JSON&extraParam=&params=${
        params ? JSON.stringify(params) : ''
      }`
    });

    if (response && response.status === 200) {
      dispatch(setLoadingData(false));

      if (response.data.success) {
        return response.data;
      }

      const error = lodash.first(response.data.errors);

      if (error) {
        const errorText = `${error.errorCode}-${error.errorText}`;
        throw Error(errorText);
      }
    }

    throw Error(response.errorText);
  } catch (err) {
    dispatch(showNotification({ message: err.message, messageType: 'error' }));
    dispatch(setLoadingData(false));
  }

  return null;
};

export const requestAuth = async ({ params, dispatch }) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${SERVER_API_URL}authUser?login=${params.login}&password=${params.password}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      withCredentials: true
    });

    if (response && response.status === 200) {
      return response.data;
    }

    throw Error(response.errorText);
  } catch (err) {
    dispatch(showNotification({ message: err.message, messageType: 'error' }));
  }

  return null;
};
