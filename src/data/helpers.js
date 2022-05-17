import axios from 'axios';
// import lodash from 'lodash';
import { setLoadingData } from './reducers/ui';
import { SERVER_API_URL } from '../common/constants/config';
// eslint-disable-next-line import/no-cycle
import { notificationShown } from './reducers/notifications';

const PENDING_SERVER_TIMER = 1000;

// это запрос готовности данных
export const requestReady = async ({ id, dispatch }) => {
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
        response.data.errors.forEach(item => {
          const { ERR_TEXT, ERR_RECOMMEND, ERR_REASON } = item;
          // так же с сервера приходит ERR_STATUS: "Warning"
          // и ERR_CODE
          dispatch(notificationShown({
            message: ERR_TEXT,
            messageType: 'error',
            reason: ERR_REASON,
            advice: ERR_RECOMMEND }));
        });

        dispatch(setLoadingData(false));
      }
    }
  return null;
};

const requesterTimeout = ({ id, dispatch }) => {
  return new Promise((resolve, reject) => {
    const timer = setInterval(async () => {
      const response = await requestReady({
        id,
        dispatch
      });
      if (response?.result === 'true' || response?.result === 'false') {
        clearInterval(timer);
        setLoadingData(false);
        resolve(response);
        return clearInterval(timer);
      }
      // if (response?.result === 'false') {
      //   clearInterval(timer);
      //   setLoadingData(false);
      //   reject(response)
      //   return clearInterval(timer);
      // }
      if (response?.result === 'failed') {
        console.log('id запроса устарел');
        reject(response)
        return clearInterval(timer);
      }
      if (response?.result === 'pending') {
        console.log('данные на сервере еще не готовы');
        reject(response)
      }
      return null;
    }, PENDING_SERVER_TIMER);
  });
}


// обычный запрос, в ответ на который мы получаем id запроса
// для получения данных по запросу, надо отправить новый запрос с указанием id
// для такого повторного запроса есть функция requestReady
export const request = async ({ params, code, token, dispatch }) => {
  // токе мы получим после логина, надо его сюда передавать
  // но если не залогинены, и токена еще нет, то передать пустой токен
  try {
    dispatch(setLoadingData(true));
    const response = await axios({
      method: 'post',
      url: `${SERVER_API_URL}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: `code=${code}&token=${encodeURI(token) || null}&format=JSON&params=${
        params ? JSON.stringify(params) : ''
      }`
    });
    if (response && response.status === 200) {
      return requesterTimeout({id: response.data, dispatch});
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
//
// export const requestAuth = async ({ params, dispatch }) => {
//   try {
//     const response = await axios({
//       method: 'get',
//       withCredentials: true,
//       url: `${SERVER_API_URL}authUser?login=${params.login}&password=${params.password}`,
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//       }
//     });
//
//     if (response && response.status === 200) {
//       return response.data;
//     }
//
//     throw Error(response.errorText);
//   } catch (err) {
//     dispatch(notificationShown({ message: err.message, messageType: 'error' }));
//   }
//
//   return null;
// };

export const prefixLS = str => `tby:md:${str}`;

export const getSimpleID = () => {
  return Math.random().toString(16).slice(2);
};

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
