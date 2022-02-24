import axios from 'axios';
import lodash from 'lodash';
import { setLoadingData } from './reducers/ui';
import { SERVER_API_URL } from '../common/constants/config';
// eslint-disable-next-line import/no-cycle
import { notificationShown } from './reducers/notifications';

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
    dispatch(notificationShown({ message: err.message, messageType: 'error' }));
    dispatch(setLoadingData(false));
  }

  return null;
};

export const requestAuth = async ({ params, dispatch }) => {
  try {
    const response = await axios({
      method: 'get',
      withCredentials: true,
      url: `${SERVER_API_URL}authUser?login=${params.login}&password=${params.password}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if (response && response.status === 200) {
      return response.data;
    }

    throw Error(response.errorText);
  } catch (err) {
    dispatch(notificationShown({ message: err.message, messageType: 'error' }));
  }

  return null;
};

export const prefixLS = str => `tby:md:${str}`;

export const getSimpleID = () => {
  return Math.random().toString(16).slice(2);
};

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
