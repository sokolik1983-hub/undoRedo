import axios from 'axios';
// import lodash from 'lodash';
import { setLoadingData } from './reducers/ui';
import { SERVER_API_URL } from '../common/constants/config';
// eslint-disable-next-line import/no-cycle
import { notificationShown } from './reducers/notifications';


// обычный запрос, в ответ на который мы получаем id запроса
// для получения данных по запросу, надо отправить новый запрос с указанием id
// для такого повторного запроса есть функция requestReady
export const request = async ({ params, code, dispatch }) => {
  try {
    dispatch(setLoadingData(true));
    const response = await axios({
      method: 'post',
      url: `${SERVER_API_URL}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: `code=${code}&format=JSON&params=${
        params ? JSON.stringify(params) : ''
      }`
    });
    if (response && response.status === 200) {
      dispatch(setLoadingData(false));
      return response.data;
    }

  } catch (err) {
    dispatch(notificationShown({
      message: err.message,
      messageType: 'error',
      reason: 'Возможно не прошли авторизацию',
      advice: 'Нажать кнопку выход и авторизоваться' }));
    dispatch(setLoadingData(false));
  }

  return null;
};

// это запрос готовности данных
export const requestReady = async ({ id, dispatch }) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${SERVER_API_URL}?id=${id}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    });
    // ответ от сервера всегда будет с кодом 200, даже если прийдет ошибка
    // разница в том, что response.data.result будет отсутствовать в ошибке
    // вместо этого мы получим response.data.errors
    if (response && response.status === 200) {
      if (response.data.result === 'true') {
        return response.data;
      }

      if (response.data.errors) {
        const { text, advise, reason } = response.data.errors[0];
        dispatch(notificationShown({
          message: text,
          messageType: 'error',
          reason,
          advice: advise }));
        dispatch(setLoadingData(false));
      }
    }
  } catch (err) {
    // сюда мы попадем, только если прийдет реальная ошибка связи с сервером
    dispatch(notificationShown({
      message: err.message,
      messageType: 'error',
      reason: 'Возможно не прошли авторизацию',
      advice: 'Нажать кнопку выход и авторизоваться' }));
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
