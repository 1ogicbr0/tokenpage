import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    address: "",
    name: "",
    publicInfo: {
      base64Avatar: "",
      description: "",
    },
    privateInfo: {
      phoneNumber: {
        phoneNumber: "",
        verified: false,
      },
      dialCode: {
        dialCode: "",
        countryCodes: "",
      },
      email: {
        emailAddress: "",
        verified: false,
      },
      username: "",
    },
  },
  reducers: {
    addProfile(state, action) {
      state.address = action.payload.address;
      state.name = action.payload.name;
      state.publicInfo = action.payload.publicInfo;
      state.privateInfo = action.payload.privateInfo;
    },
    removeProfile(state, action) {
      state.address = "";
      state.name = "";
      state.publicInfo = {
        base64Avatar: "",
        description: "",
      };
      state.privateInfo = {
        phoneNumber: {
          phoneNumber: "",
          verified: false,
        },
        dialCode: {
          dialCode: "",
          countryCodes: "",
        },
        email: {
          emailAddress: "",
          verified: false,
        },
        username: "",
      };
    },
  },
});
const { actions, reducer } = profileSlice;
export const { addProfile, removeProfile } = actions;
export default reducer;
