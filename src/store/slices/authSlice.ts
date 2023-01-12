import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: "",
    refreshToken: "",
    expiredAt: 0,
  },
  reducers: {
    addToken(state, action) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.expiredAt = action.payload.expiredAt;
    },
    removeToken(state, action) {
      state.accessToken = "";
      state.refreshToken = "";
      state.expiredAt = 0;
    },
  },
});
const { actions, reducer } = authSlice;
export const { addToken, removeToken } = actions;
export default reducer;
