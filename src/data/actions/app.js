/* eslint-disable */
/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/no-cycle
import { createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../helpers';
import { setDictionaries, setReposChildren, setReposFolderId } from '../reducers/data';
import { setToastList } from '../reducers/ui';
// eslint-disable-next-line import/no-cycle
import { notificationShown } from '../reducers/notifications';

let toastProperties = null;

export const getDictionaries = queryParams => {
  return async dispatch => {
    try {
      const response = await request({
        code: 'CMS.LOGIN',
        params: queryParams,
        dispatch
      });
      if (response) {
        dispatch(setDictionaries(response));
      }
    } catch (err) {
      dispatch(
        notificationShown({ message: err.message, messageType: 'error' })
      );
    }
  };
};

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
  }
}

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

export const showToast = (type, title, description) => {
  return (dispatch, getState) => {
    const state = getState()
    const toastList = state.app.ui.toastList

    const toastProperties = {
          id: Math.random(),
          title,
          description,
          type,
    }
    dispatch(setToastList([...toastList, toastProperties]));
  }
}
