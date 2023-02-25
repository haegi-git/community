import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./page/Login";
import Join from "./page/Join";
import Board from "./page/Board";
import New from "./page/New";
import { auth } from "./index";
import { useDispatch, useSelector } from "react-redux";
import { setLoginUserData, toggleDark } from "./store";
import Detail from "./page/Detail";
import { useEffect } from "react";
import Edit from "./page/Edit";
import MyPage from "./page/MyPage";
import Darkmode from "./Darkmode";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        dispatch(
          setLoginUserData({
            userName: user.displayName,
            userUid: user.uid,
            userPhoto: user.photoURL,
          })
        );
      }
    });
  }, []);
  const dark = useSelector((state) => state.dark);
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* 로그인과 회원가입 페이지 */}
          <Route path="/" element={<Login />} />
          <Route path="/join" element={<Join />} />
          {/* 메인 게시판 */}
          <Route path="/board" element={<Board />} />

          {/* 상세페이지 */}
          <Route path="/board/:id" element={<Detail />} />
          {/* 글 작성 페이지 새로운 글 작성*/}
          <Route path="/new" element={<New />} />
          <Route path="/edit/:id" element={<Edit />} />
          {/* 마이페이지 */}
          <Route path="mypage" element={<MyPage />} />
        </Routes>
      </div>
      <Darkmode dark={dark} />
    </BrowserRouter>
  );
}

export default App;
