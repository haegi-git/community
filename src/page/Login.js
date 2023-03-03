import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../index";
import { singInWithGoogle } from "../index";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user !== null) {
        navigate("/board", { replace: true });
      }
    });
  }, []);

  const [loginState, setLoginState] = useState({
    loginEmail: "",
    loginPassword: "",
  });
  const [question, setQuestion] = useState(false);

  const [loginError, setLoginError] = useState("");

  const handelLoginState = (e) => {
    setLoginState({
      ...loginState,
      [e.target.name]: e.target.value,
    });
    setLoginError("");
  };

  const loginBtn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(
        loginState.loginEmail,
        loginState.loginPassword
      )
      .then((res) => {
        // 로그인에 성공했을 때
        navigate("/board", { replace: true });
      })
      .catch((err) => {
        if (err.code === "auth/invalid-email") {
          // 이메일 틀렸을 때
          setLoginError("You have entered the wrong email.");
        } else if (err.code === "auth/wrong-password") {
          // 비밀번호 틀렸을 때
          setLoginError("You have the wrong password.");
        } else if (err.code === "auth/too-many-requests") {
          // 로그인 많이 틀렸을 때
          setLoginError(
            "Your account has been temporarily deactivated due to several failures."
          );
        } else {
          // 존재하지 않는 이메일일 때
          setLoginError("This email does not exist.");
        }
      });
  };
  return (
    <div className="Login">
      <div className="Login_top">
        <h1 style={{ marginTop: "50px", marginBottom: "50px" }}>just talk</h1>
        <form>
          <label>Email</label>
          <input
            onChange={handelLoginState}
            name="loginEmail"
            value={loginState.loginEmail}
            type="email"
            placeholder="Email"
          />
          <label>Password</label>
          <input
            onChange={handelLoginState}
            name="loginPassword"
            value={loginState.loginPassword}
            type="password"
            placeholder="Password"
          />
          <ErrorMessage>{loginError}</ErrorMessage>
          <button onClick={loginBtn}>Login</button>
          {question === false ? null : (
            <QuestionBtn>
              <p>
                현재 비밀번호 찾기는
                <br /> 불가능합니다.
              </p>
            </QuestionBtn>
          )}
        </form>
        <FontAwesomeIcon
          onClick={() => {
            setQuestion(!question);
          }}
          style={{ marginBottom: "15px" }}
          icon={faCircleQuestion}
        />
      </div>
      <div className="Login_bottom">
        <button
          onClick={() => {
            navigate("/join");
          }}
        >
          Create an account
        </button>
        <p style={{ marginBottom: "10px" }}>Or, continue with</p>
        <button
          onClick={() => {
            singInWithGoogle().then(() => {
              navigate("/board");
            });
          }}
        >
          Google
        </button>
        <p
          onClick={() => {
            navigate("/board");
          }}
        >
          Guest Mode
        </p>
      </div>
    </div>
  );
};
export default Login;

const ErrorMessage = styled.p`
  color: var(--errorColor);
  font-size: 14px;
  margin-bottom: 15px;
`;

const QuestionBtn = styled.div`
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #d2d2d2;
  width: 200px;
  height: 50px;
  border-radius: 5px;
  &:after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -12px;
    margin: 0 auto;
    width: 0;
    height: 0;
    border-top: 15px solid #d2d2d2;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
  }
  & > p {
    font-size: 14px;
    color: #495057;
  }
`;
