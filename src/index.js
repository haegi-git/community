import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCM4BQhsbw2yXE0tlpDLOMYVH5N_AzQhog",
  authDomain: "community-portfolio.firebaseapp.com",
  projectId: "community-portfolio",
  storageBucket: "community-portfolio.appspot.com",
  messagingSenderId: "573345043635",
  appId: "1:573345043635:web:8993e88f5bb74474374cc6",
  measurementId: "G-XRKTXQ1X2B",
};

firebase.initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();

// 아래의 코드는 구글로그인을 구현하기위한 코드
const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const singInWithGoogle = () => auth.signInWithPopup(googleProvider);
