import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { getSimpleID } from '../helpers';

const notifications = createSlice({
  name: 'notifications',
  initialState: {
    items: []
  },
  reducers: {
    notificationShown: (state, action) => {
      state.items.push({
        id: getSimpleID(),
        autoHide: false,
        ...action.payload
      });
    },
    notificationClosed: (state, action) => {
      state.items = state.items.filter(
        notification => notification.id !== action.payload.id
      );
    }
  }
});

export const { notificationShown, notificationClosed } = notifications.actions;

export default notifications.reducer;
