import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../index";
import { singInWithGoogle } from "../index";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user !== null) {
        console.log(user);
      }
    });
  }, []);
  return (
    <div className="Login">
      <div className="Login_top">
        <h1 style={{ marginTop: "50px", marginBottom: "50px" }}>just talk</h1>
        <form>
          <label>Email</label>
          <input placeholder="Email" />
          <label>Password</label>
          <input placeholder="Password" />
          <button>Login</button>
        </form>
        <FontAwesomeIcon icon={faCircleQuestion} />
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
        <button onClick={singInWithGoogle}>Google</button>
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
