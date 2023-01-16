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

const previewPhotoState = createSlice({
  name: "previewPhotoState",
  initialState: "",
  reducers: {
    getPhoto(state, action) {
      return (state = action.payload);
    },
  },
});

const test = createSlice({
  name: "test",
  initialState: "",
  reducers: {
    getTest(state, action) {
      return (state = action.payload);
    },
  },
});

export default configureStore({
  reducer: {
    inputState: inputState.reducer,
    previewPhotoState: previewPhotoState.reducer,
    loginUserData: loginUserData.reducer,
    test: test.reducer,
  },
});
export const { setInputState } = inputState.actions;
export const { getPhoto } = previewPhotoState.actions;
export const { setLoginUserData } = loginUserData.actions;
export const { getTest } = test.actions;
