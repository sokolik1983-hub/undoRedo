/* eslint-disable camelcase */
import axios from 'axios';
import { setLoadingData } from './reducers/ui';
import { SERVER_API_URL } from '../common/constants/config';
// eslint-disable-next-line import/no-cycle
import { notificationShown } from './reducers/notifications';
// eslint-disable-next-line import/no-cycle

const PENDING_SERVER_TIMER = 5000;
const ATTEMPTS = 50;

// это запрос готовности данных
export const requestReady = async ({ id, dispatch }) => {
  const response = await axios({
    method: 'get',
    url: `${SERVER_API_URL}?id=${id}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  // ответ от сервера всегда будет с кодом 200, даже если прийдет ошибка
  // разница в том, что response.data.result будет отсутствовать в ошибке
  // вместо этого мы получим response.data.errors

  if (response && response.status === 200) {
    // добавить все условия
    if (
      response.data.result === true ||
      response.data.result === 'pending' ||
      response.data.result === 'failed'
    ) {
      return response.data;
    }

    if (response.data.result === false && response.data.errors) {
      response.data.errors.forEach(item => {
        // eslint-disable-next-line camelcase
        const { err_text, err_recommend, err_reason } = item;
        dispatch(
          notificationShown({
            message: err_text,
            messageType: 'error',
            reason: err_reason,
            advice: err_recommend
          })
        );
        // err_category: 1
        // err_code: "040.00001"
        // err_group: "Центральный"
        // err_reason: "Не удалось аутентифицировать указанное имя пользователя."
        // err_recommend: "Введите допустимые имя пользователя и пароль."
        // err_status: "Warning"
        // err_text: "Неверное имя пользователя или пароль."
      });

      dispatch(setLoadingData(false));
    }
  }
  return null;
};

const requesterTimeout = ({ id, dispatch }) => {
  return new Promise((resolve, reject) => {
    let tryCount = 0;
    const timer = setInterval(async () => {
      tryCount++;
      const response = await requestReady({
        id,
        dispatch
      });

      if (response?.result === true || !response) {
        setLoadingData(false);
        resolve(response);
        return clearInterval(timer);
      }
      if (response?.result === 'failed') {
        console.log('id запроса устарел');
        clearInterval(timer);
        return reject(response);
      }
      if (response?.result === 'pending') {
        if (tryCount >= ATTEMPTS) {
          console.log('исчерпаны попытки, выход из запроса');
          clearInterval(timer);
          return reject(response);
        }
        console.log('данные на сервере еще не готовы');
        reject(response);
      }
      return null;
    }, PENDING_SERVER_TIMER);
  });
};

// обычный запрос, в ответ на который мы получаем id запроса
// для получения данных по запросу, надо отправить новый запрос с указанием id
// для такого повторного запроса есть функция requestReady
export const request = async ({ params, code, dispatch }) => {
  const streamreceiver = localStorage.getItem('streamreceiver');
  const token = localStorage.getItem('token');

  try {
    dispatch(setLoadingData(true));
    const response = await axios({
      method: 'post',
      url: `${SERVER_API_URL}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: `code=${code}&token=${encodeURI(token) ||
        null}&format=JSON&params=${
        params ? JSON.stringify(params) : ''
      }&streamreceiver=${streamreceiver || null}`
    });
    if (response && response.status === 200) {
      return requesterTimeout({ id: response.data, dispatch });
    }
  } catch (err) {
    dispatch(
      notificationShown({
        message: err.message,
        messageType: 'error',
        reason: 'Возможно не прошли авторизацию',
        advice: 'Нажать кнопку выход и авторизоваться'
      })
    );
    dispatch(setLoadingData(false));
  }

  return null;
};

// запросы в одну сторону, на которые не ждем ответ
export const requestWithoutResponse = async ({
  params,
  code,
  token,
  dispatch
}) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${SERVER_API_URL}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: `code=${code}&token=${encodeURI(token) ||
        null}&format=JSON&params=${params ? JSON.stringify(params) : ''}`
    });
    if (response && response.status === 200) {
      return null;
    }
  } catch (err) {
    dispatch(
      notificationShown({
        message: err.message,
        messageType: 'error',
        reason: 'Сервер не отвечает',
        advice: 'Обратиттесь к системному администратору'
      })
    );
  }
  return null;
};

export const prefixLS = str => `tby:md:${str}`;

export const getSimpleID = () => {
  return Math.random()
    .toString(16)
    .slice(2);
};

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const getTableIdFromParams = ({
  schema,
  object_name,
  object_type_id,
  connect_id
}) => {
  return `${schema}_${object_name}_${object_type_id}_${connect_id}`;
};

export const deepObjectSearch = ({ target, key, value, parent = null }) => {
  let result = [];
  const keys = Object.keys(target);
  for (let i = 0; i < keys.length; i++) {
    const objectKey = keys[i];

    if (typeof target[objectKey] === 'object') {
      result = result.concat(
        deepObjectSearch({ target: target[objectKey], key, value, parent: target }) 
      );
    }
    /*eslint-disable */
    if (objectKey !== key) continue;

    if(objectKey === key && target[objectKey] === value) {
      result.push({target, parent})
    }
  }
  return result;
};


// let t = {
//   a: {
//     b: {
//       c: [
//         {
//           id: '14'
//         },
//         {
//           id: '15'
//         },
//         {
//           id: '16'
//         },
//       ]
        
      
//     },
//     g: 'ffff'
//   },
//   f: 2
// }


// console.log('find',deepObjectSearch({ target: t, key: 'id', value: '14' }))