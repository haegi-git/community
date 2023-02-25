import { configureStore, createSlice } from "@reduxjs/toolkit";

const inputState = createSlice({
  name: "inputState",
  initialState: {
    inputTitle: "",
    inputContent: "",
  },
  reducers: {
    setInputState(state, action) {
      const getInputValue = action.payload;
      return (state = getInputValue);
    },
  },
});

const loginUserData = createSlice({
  name: "loginUserData",
  initialState: {
    userName: "",
    userUid: "",
    userPhoto: "",
  },
  reducers: {
    setLoginUserData(state, action) {
      const LoginData = action.payload;
      state.userName = LoginData.userName;
      state.userUid = LoginData.userUid;
      state.userPhoto = LoginData.userPhoto;
    },
  },
});

const editPreviewPhoto = createSlice({
  name: "editPreviewPhoto",
  initialState: "",
  reducers: {
    getPhoto(state, action) {
      return (state = action.payload);
    },
  },
});

const dark = createSlice({
  name: "dark",
  initialState: false,
  reducers: {
    toggleDark(state, action) {
      return !state;
    },
  },
});

export default configureStore({
  reducer: {
    inputState: inputState.reducer,
    editPreviewPhoto: editPreviewPhoto.reducer,
    loginUserData: loginUserData.reducer,
    dark: dark.reducer,
  },
});
export const { setInputState } = inputState.actions;
export const { getPhoto } = editPreviewPhoto.actions;
export const { setLoginUserData } = loginUserData.actions;
export const { toggleDark } = dark.actions;
