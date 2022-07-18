import { request } from '../helpers';
import { setReposChildren, setReposFolderId } from '../reducers/data';
import {
  failedFavoriteObjects,
  loadingFavoriteObjects,
  setFavoriteObjects,
  successFavoriteObjects,
} from '../reducers/data';
import { setToastList } from '../reducers/ui';

export const getReposChildren = (queryParams) => {
  return async (dispatch) => {
    const response = await request({
      code: 'REPOS.GET_CHILDREN',
      params: queryParams,
      dispatch,
    });
    if (response?.result) {
      dispatch(setReposChildren(response.data));
    }
  };
};

export const getReposSpecFolder = (queryParams) => {
  return async (dispatch) => {
    const response = await request({
      code: 'REPOS.GET_SPECIAL_FOLDER',
      params: queryParams,
      dispatch,
    });
    if (response?.result) {
      dispatch(setReposFolderId(response.id));
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
      type,
    };
    dispatch(setToastList([...toastList, toastProperties]));
  };
};

/**
 * Получение объектов, добавленных в Избранные.
 */
export const getFavoriteObjects = () => {
  return async (dispatch) => {
    dispatch(loadingFavoriteObjects());
    await request({
      code: 'CMS.USER.GET_FAVORITES',
      params: { user_id: 10001 },
      dispatch,
    })
      .then((response) => {
        if (response?.objects) {
          dispatch(
            setFavoriteObjects([
              ...response.objects[0],
              ...response.objects[1],
            ]),
          );
          dispatch(successFavoriteObjects());
        }
      })
      .catch(() => {
        dispatch(failedFavoriteObjects());
      });
  };
};

/**
 * Добавление/удаление объектов в Избранные.
 *
 * @prop queryParams Параметры.
 */
export const setObjectFavoriteStatus = (queryParams, callback) => {
  return async (dispatch) => {
    await request({
      code: 'CMS.USER.SET_FAVORITE',
      params: queryParams,
      dispatch,
    }).then((response) => {
      if (queryParams.isExclude === 1) {
        if (response.result === 1) {
          callback(true);
        }
      }
    });
  };
};
