import axios from 'axios';

import { EMPTY_STRING } from '../common/constants/common';
import {
  ATTEMPTS,
  PENDING_RESPONSE,
  PENDING_SERVER_TIMER,
  SERVER_API_URL,
  SESSION_EXPIRED_MSG,
} from '../common/constants/config';
import { logoutUser } from './auth/actions/auth';
import { notificationShown } from './reducers/notifications';
import { setLoadingData } from './reducers/ui';
import { AppDispatch } from './store';

// это запрос готовности данных
export const requestReady = async <T>({ id, dispatch }) => {
  const response = await axios.request<T>({
    method: 'get',
    url: `${SERVER_API_URL}?id=${id}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  // ответ от сервера всегда будет с кодом 200, даже если прийдет ошибка
  // разница в том, что response.data.result будет отсутствовать в ошибке
  // вместо этого мы получим response.data.errors
  if (response && response.status === 200) {
    // добавить все условия
    if (
      response.data.result === 1 ||
      response.data.result === PENDING_RESPONSE
    ) {
      return response.data;
    }

    if (response.data.result === 0 && response.data.errors) {
      response.data.errors.forEach((item) => {
        // eslint-disable-next-line camelcase
        const { errText, errRecommend, errReason, isVisible, errorCode } = item;
        if (isVisible !== 0) {
          dispatch(
            notificationShown({
              message: errText,
              messageType: 'error',
              reason: errReason,
              advice: errRecommend,
            }),
          );
          if (errorCode === SESSION_EXPIRED_MSG) {
            dispatch(logoutUser());
          }
        }
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

interface IRequesterTimeout<T> {
  id: T;
  dispatch: AppDispatch;
}

const requesterTimeout = <T>({ id, dispatch }: IRequesterTimeout<T>) =>
  new Promise((resolve, reject) => {
    let tryCount = 0;
    const interval = async () => {
      tryCount++;
      const response = await requestReady({
        id,
        dispatch,
      });
      if (response?.result === 1 || !response) {
        setLoadingData(false);
        return resolve(response);
      }
      if (response?.result === 'failed') {
        console.log('id запроса устарел');
        return reject(response);
      }
      if (response?.result === PENDING_RESPONSE) {
        if (tryCount >= ATTEMPTS) {
          console.log('исчерпаны попытки, выход из запроса');
          return reject(response);
        }
        console.log('данные на сервере еще не готовы');
        return setTimeout(interval, PENDING_SERVER_TIMER);
      }
      return null;
    };

    setTimeout(interval, PENDING_SERVER_TIMER);
  });

// обычный запрос, в ответ на который мы получаем id запроса
// для получения данных по запросу, надо отправить новый запрос с указанием id
// для такого повторного запроса есть функция requestReady
interface IRequestParams<T> {
  params: T;
  code: string;
  dispatch: AppDispatch;
}

export const request = async <T>({
  params,
  code,
  dispatch,
}: IRequestParams<T>): Promise<any> => {
  const token = localStorage.getItem('token') as string;
  const streamreceiver = localStorage.getItem('streamreceiver');
  try {
    const response = await axios({
      method: 'post',
      url: `${SERVER_API_URL}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: `code=${code}&token=${encodeURI(token) || null}&format=JSON${
        streamreceiver ? `&streamreceiver=${streamreceiver}` : ''
      }${
        params ? `&params=${encodeURIComponent(JSON.stringify(params))}` : ''
      }`,
    });

    if (response && response.status === 200) {
      return requesterTimeout({ id: response.data, dispatch });
    }
  } catch (err) {
    dispatch(
      notificationShown({
        message: err.message,
        messageType: 'error',
        reason: 'Сервер не отвечает',
        advice: 'Обратиттесь к системному администратору',
      }),
    );
  }
  dispatch(setLoadingData(false));
  return null;
};

// запросы в одну сторону, на которые не ждем ответ
interface IRequestWithoutResponseParams<T> {
  params?: T;
  code: string;
  token?: string;
  dispatch: AppDispatch;
}
export const requestWithoutResponse = async <T>({
  params,
  code,
  token = EMPTY_STRING,
  dispatch,
}: IRequestWithoutResponseParams<T>) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${SERVER_API_URL}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: `code=${code}&token=${
        encodeURI(token) || null
      }&format=JSON&params=${params ? JSON.stringify(params) : EMPTY_STRING}`,
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
        advice: 'Обратиттесь к системному администратору',
      }),
    );
  }
  return null;
};

export const prefixLS = (str) => `tby:md:${str}`;

export const getSimpleID = () => {
  return Math.random().toString(16).slice(2);
};

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getTableIdFromParams = ({ schema, objectName }) => {
  return `${schema}_${objectName}`;
};

interface IDeepObjectSearchParams {
  target: string;
  key: string;
  value: string;
  parentNodes: string[];
  parentKey: string | null;
}
export const deepObjectSearch = ({
  target,
  key,
  value,
  parentNodes = [],
  parentKey = null,
}: IDeepObjectSearchParams) => {
  let result = []; // нужен тип
  const keys = Object.keys(target);
  for (let i = 0; i < keys.length; i++) {
    const objectKey = keys[i];

    if (target[objectKey] !== null && typeof target[objectKey] === 'object') {
      result = result.concat(
        deepObjectSearch({
          target: target[objectKey],
          key,
          value,
          parentNodes: [target, ...parentNodes],
          parentKey: objectKey,
        }),
      );
    }

    if (objectKey !== key) continue;

    if (objectKey === key && target[objectKey] === value) {
      result.push({ target, parentKey, parentNodes });
    }
  }
  return result;
};
