import { createSlice } from "@reduxjs/toolkit";

const notifications = createSlice({
  name: "notifications",
  initialState: {
    message: null,
    messageType: null,
  },
  reducers: {
    showNotification: (state, action) => {
      state.message = action.payload.message;
      state.messageType = action.payload.messageType;
    },
  },
});

export const { showNotification } = notifications.actions;

export default notifications.reducer;
