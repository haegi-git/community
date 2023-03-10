import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { auth, db } from "../index";
import { setLoginUserData } from "../store";
import PreviewPhoto from "../util/PreviewPhoto";
import StorageUpload from "../util/StorageUpload";

const Join = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // input칸에 제대로 작성하지 않았을 때 에러를 띄움과 동시에 그 에러input에 포커스주기
  // 위해 만들어둔 useRef
  const nicknameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  // 유저의 기본이미지를 담아둘 곳
  const [defaultPhoto, setDefaultPhoto] = useState();
  // 이메일 또는 비빌번호를 잘못입력해서 에러날 상태변환을 담을 곳
  const [joinError, setJoinError] = useState({
    joinErrorEmail: false,
    joinErrorPassword: false,
    joinErrorNickname: false,
  });

  // 이미지 설정 후 회원가입 할 때

  useEffect(() => {
    db.collection("default").onSnapshot((res) => {
      //   console.log(res.docs[0].data()); 파이어베이스 데이터베이스중 default라는곳의
      // 유저의 기본이미지로 사용될 이미지경로만 가져옴
      setDefaultPhoto(res.docs[0].data().photo);
    });
  }, []);
  //   회원가입의 input의 값을 관리해줄 state
  const [joinState, setJoinState] = useState({
    joinPhoto: undefined,
    joinEmail: "",
    joinPassword: "",
    joinNickname: "",
  });
  //   회원가입의 input의 값을 변경해줄 함수
  const handelJoinInput = (e) => {
    setJoinState({
      ...joinState,
      [e.target.name]: e.target.value,
    });
    setJoinError({
      joinErrorEmail: false,
      joinErrorPassword: false,
      joinErrorNickname: false,
    });
  };
  //   이미지 업로드 시 이미지 미리볼 이미지경로
  const [previewUserPhoto, setPreviewUserPhoto] = useState();

  //   이미지 업로드 시 이미지 미리보기 변경해줄 함수
  const previewPhoto = async (e) => {
    e.preventDefault();
    const getPreviewPhoto = await PreviewPhoto(e.target.files[0]);
    setPreviewUserPhoto(getPreviewPhoto);
  };
  //   버튼에 회원가입 기능 넣어줄 함수
  const createAccount = async (e) => {
    // form안에 만들어져있기에 preventDefault를 사용해서 기본적으로 새로고침되는걸
    // 막아줘야함
    e.preventDefault();
    // const url = await StorageUpload(
    //   "userPhoto",
    //   joinState.joinPhoto.name,
    //   joinState.joinPhoto
    // );

    const userDataDb = {
      userEmail: joinState.joinEmail,
      userNickname: joinState.joinNickname,
      userPhoto: defaultPhoto,
    };

    if (joinState.joinNickname.length < 1) {
      setJoinError({
        ...joinError,
        joinErrorNickname: true,
      });
      nicknameRef.current.focus();
    } else {
      auth
        .createUserWithEmailAndPassword(
          joinState.joinEmail,
          joinState.joinPassword
        )
        .then((res) => {
          if (joinState.joinPhoto) {
            StorageUpload(
              "userPhoto/",
              joinState.joinPhoto.name,
              joinState.joinPhoto
            ).then((url) => {
              res.user.updateProfile({
                displayName: joinState.joinNickname,
                photoURL: url,
              });
              const userPhotoDb = { ...userDataDb, userPhoto: url };
              db.collection("user")
                .doc(res.user.uid)
                .set(userPhotoDb)
                .then(() => {
                  dispatch(
                    setLoginUserData({
                      userName: joinState.joinNickname,
                      userUid: res.user.uid,
                      userPhoto: url,
                    })
                  );
                });
            });
          } else {
            res.user.updateProfile({
              displayName: joinState.joinNickname,
              photoURL: defaultPhoto,
            });
            db.collection("user")
              .doc(res.user.uid)
              .set(userDataDb)
              .then(() => {
                dispatch(
                  setLoginUserData({
                    userName: joinState.joinNickname,
                    userUid: res.user.uid,
                    userPhoto: defaultPhoto,
                  })
                );
              });
          }
          navigate("/board", { replace: true });
        })
        .catch((error) => {
          console.log(error);
          if (error.code === "auth/weak-password") {
            setJoinError({
              ...joinError,
              joinErrorPassword: true,
            });
            passwordRef.current.focus();
          } else if (error.code === "auth/invalid-email") {
            setJoinError({
              ...joinError,
              joinErrorEmail: true,
            });
            emailRef.current.focus();
          }
        });
    }
  };

  const leftBtn = () => {
    navigate(-1);
  };

  return (
    <div className="Join">
      <Header leftBtn={leftBtn} centerTitle="Join" />
      <h3>Create a Just Talk account</h3>

      <form>
        <img
          src={previewUserPhoto === undefined ? defaultPhoto : previewUserPhoto}
          alt="userPhoto"
        />
        <label
          style={{
            textAlign: "center",
            marginTop: "15px",
            marginBottom: "15px",
          }}
          htmlFor="joinPhoto"
        >
          이미지 변경하기
        </label>
        <input
          id="joinPhoto"
          type="file"
          style={{ display: "none" }}
          onChange={(e) => {
            previewPhoto(e);
            setJoinState({
              ...joinState,
              joinPhoto: e.target.files[0],
            });
          }}
        />
        <label>Email</label>
        <input
          type="email"
          value={joinState.joinEmail}
          onChange={handelJoinInput}
          name="joinEmail"
          placeholder="Enter email"
          ref={emailRef}
        />
        <p className={`joinError emailError_${joinError.joinErrorEmail}`}>
          Enter a valid email address
        </p>
        <label>Password</label>
        <input
          type="password"
          value={joinState.joinPassword}
          onChange={handelJoinInput}
          name="joinPassword"
          placeholder="Enter password"
          ref={passwordRef}
        />
        <p className={`joinError passwordError_${joinError.joinErrorPassword}`}>
          Password must be at least 6 characters long
        </p>
        <label>Nickname</label>
        <input
          type="text"
          value={joinState.joinNickname}
          onChange={handelJoinInput}
          name="joinNickname"
          placeholder="Enter Nickname"
          ref={nicknameRef}
        />
        <p className={`joinError nicknameError_${joinError.joinErrorNickname}`}>
          Please write your nickname.
        </p>

        <button onClick={createAccount}>Continue</button>
      </form>
    </div>
  );
};
export default Join;
