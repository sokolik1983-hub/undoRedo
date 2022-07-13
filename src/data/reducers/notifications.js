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
      const currentNotification = state.items?.find((item) => {
        return (
          JSON.stringify(item.message) === JSON.stringify(...action.payload)
        );
      });
      if (!currentNotification) {
        state.items.push({
          id: getSimpleID(),
          autoHide: false,
          message: {
            ...action.payload
          }
        });
      }
    },
    notificationClosed: (state, action) => {
      state.items = state.items.filter(
        (notification) => notification.id !== action.payload.id
      );
    }
  }
});

export const { notificationShown, notificationClosed } = notifications.actions;

export default notifications.reducer;
