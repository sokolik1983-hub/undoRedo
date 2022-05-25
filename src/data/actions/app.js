/* eslint-disable */
/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/no-cycle
import { createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../helpers';
import { setDictionaries } from '../reducers/data';
import { setToastList } from '../reducers/ui';
// eslint-disable-next-line import/no-cycle
import { notificationShown } from '../reducers/notifications';

let toastProperties = null;

export const getDictionaries = queryParams => {
  return async dispatch => {
    try {
      const response = await request({
        func: 'DIC.ALL',
        params: queryParams,
        dispatch
      });
      if (response?.success) {
        dispatch(setDictionaries(response.result));
      }
    } catch (err) {
      dispatch(
        notificationShown({ message: err.message, messageType: 'error' })
      );
    }
  };
};

export const showToast = createAsyncThunk(
  'ternUniverse/showToastThunk',
  (type, { dispatch, getState }) => {
    const state = getState()
    const toastList = state.app.ui.toastList

    switch (type) {
      case 'success':
        toastProperties = {
          id: Math.random(),
          title: 'Success',
          description: 'This is a success toast component',
          backgroundColor: '#5cb85c',
          type: 'success'
        };
        break;
      case 'danger':
        toastProperties = {
          id: Math.random(),
          title: 'Пустые фильтры',
          description: '',
          backgroundColor: '#d9534f',
          type: 'danger'
        };
        break;
      default:
        toastProperties = [];
    }
    dispatch(setToastList([...toastList, toastProperties]));
  }
)
