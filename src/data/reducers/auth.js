import { createSlice } from "@reduxjs/toolkit";

const auth = createSlice({
  name: "auth",
  initialState: {
    isAuth: true,
    userInfo: {},
  },
  reducers: {
    loginUser: (state, action) => {
      state.isAuth = true;
      state.userInfo = action.payload;
    },
    logoutUser: (state) => {
      state.isAuth = false;
      state.userInfo = {};
    },
  },
});

export const { loginUser, logoutUser } = auth.actions;

export default auth.reducer;
