import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./page/Login";
import Join from "./page/Join";
import Board from "./page/Board";
import New from "./page/New";
import { auth } from "./index";
import { useDispatch } from "react-redux";
import { setLoginUserData } from "./store";
import Detail from "./page/Detail";

function App() {
  const dispatch = useDispatch();
  auth.onAuthStateChanged((user) => {
    if (user) {
      dispatch(
        setLoginUserData({
          userName: user.displayName,
          userUid: user.uid,
          userPhoto: user.photoURL,
        })
      );
    }
  });
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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
