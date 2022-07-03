/* eslint-disable */
/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/no-cycle
import { request } from '../helpers';
import { setReposChildren, setReposFolderId } from '../reducers/data';
import { setToastList } from '../reducers/ui';
// eslint-disable-next-line import/no-cycle
import { notificationShown } from '../reducers/notifications';
import {
  setFavoriteObjects,
  loadingFavoriteObjects,
  successFavoriteObjects,
  failedFavoriteObjects
} from '../reducers/data';

let toastProperties = null;

export const getReposChildren = queryParams => {
  return async dispatch => {
    try {
      const response = await request({
        code: 'REPOS.GET_CHILDREN',
        params: queryParams,
        dispatch
      });
      if (response?.result) {
        dispatch(setReposChildren(response.data));
      }
    } catch (err) {
      dispatch(
        notificationShown({ message: err.message, messageType: 'error' })
      );
    }
  };
};

export const getReposSpecFolder = queryParams => {
  return async dispatch => {
    try {
      const response = await request({
        code: 'REPOS.GET_SPECIAL_FOLDER',
        params: queryParams,
        dispatch
      });
      if (response?.result) {
        dispatch(setReposFolderId(response.id));
      }
    } catch (err) {
      dispatch(
        notificationShown({ message: err.message, messageType: 'error' })
      );
    }
  };
};

/**
 * Показывает компонент временных уведомлений.
 *
 * @prop type Тип - danger или success.
 * @prop title Текст заголовка.
 * @prop description Текст описания.
 */
export const showToast = (type, title, description) => {
  return (dispatch, getState) => {
    const state = getState();
    const toastList = state.app.ui.toastList;

    const toastProperties = {
      id: Math.random(),
      title,
      description,
      type
    };
    dispatch(setToastList([...toastList, toastProperties]));
  };
};

/**
 * Получение объектов, добавленных в Избранные.
 */
export const getFavoriteObjects = () => {
  return async dispatch => {
    dispatch(loadingFavoriteObjects());
    await request({
      code: 'CMS.USER.GET_FAVORITES',
      params: { user_id: 10001 },
      dispatch
    })
      .then(response => {
        if (response?.data) {
          dispatch(successFavoriteObjects());
          dispatch(setFavoriteObjects(response.objects[0]));
        }
      })
      .catch(() => {
        dispatch(failedFavoriteObjects());
      })
      .finally(() => {
        dispatch(failedFavoriteObjects());
      });
  };
};

/**
 * Добавление/удаление объектов в Избранные.
 *
 * @prop queryParams Параметры.
 */
export const setObjectToFavorites = queryParams => {
  return async dispatch => {
    await request({
      code: 'CMS.USER.SET_FAVORITE',
      params: queryParams,
      dispatch
    });
  };
};
