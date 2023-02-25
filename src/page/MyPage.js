import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth, db } from "../index";
import Header from "../components/Header";
import PreviewPhoto from "../util/PreviewPhoto";
import StorageUpload from "../util/StorageUpload";
import { setLoginUserData } from "../store";

const MyPage = () => {
  const user = useSelector((state) => state.loginUserData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const leftBtn = () => {
    navigate(-1);
  };
  const [preview, setPreview] = useState();
  const [photo, setPhoto] = useState();
  const [changeName, setChangeName] = useState("");
  const [blankError, setBlankError] = useState("none");
  const previewPhoto = async (e) => {
    e.preventDefault();
    const getPreviewPhoto = await PreviewPhoto(e.target.files[0]);
    setPreview(getPreviewPhoto);
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    if (changeName.length > 1) {
      if (photo) {
        const url = await StorageUpload("userPhoto/", photo.name, photo);
        auth.onAuthStateChanged((user) => {
          user
            .updateProfile({
              displayName: changeName,
              photoURL: url,
            })
            .then(() => {
              dispatch(
                setLoginUserData({
                  userName: changeName,
                  userPhoto: url,
                })
              );
            });
        });
      } else {
        auth.onAuthStateChanged((user) => {
          user
            .updateProfile({
              displayName: changeName,
            })
            .then(() => {
              dispatch(
                setLoginUserData({
                  userName: changeName,
                })
              );
            });
        });
      }
    } else {
      setBlankError("block");
    }
  };
  return (
    <MyPageContainer>
      <Header leftBtn={leftBtn} centerTitle="MyPage" />
      <MyPageForm blankError={blankError}>
        <img
          src={preview === undefined ? user.userPhoto : preview}
          alt="이미지변경"
        />
        <label htmlFor="profilePhoto">이미지 변경하기</label>
        <input
          onChange={(e) => {
            previewPhoto(e);
            setPhoto(e.target.files[0]);
          }}
          type="file"
          id="profilePhoto"
          style={{ display: "none" }}
        />
        <label style={{ textAlign: "start", width: "80%", marginTop: "30px" }}>
          Change nickname
        </label>
        <input
          value={changeName}
          onChange={(e) => {
            setChangeName(e.target.value);
            setBlankError("none");
          }}
          type="text"
          placeholder="Change nickname"
        />
        <p>Nickname is blank.</p>
        <button onClick={updateProfile}>done</button>
      </MyPageForm>
    </MyPageContainer>
  );
};
export default MyPage;

const MyPageContainer = styled.div`
  padding: 30px;
`;

const MyPageForm = styled.form`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  margin-top: 30px;
  & > img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  & > input {
    width: 80%;
    height: 50px;
    border: none;
    border-bottom: 1px solid black;
    margin-bottom: 30px;
    font-size: 20px;
    background-color: var(--inputColor);
  }
  & > button {
    width: 80%;
    height: 50px;
    border: none;
    background-color: antiquewhite;
    border-radius: 50px;
    margin-bottom: 30px;
    border: 1px solid black;
  }
  & > p {
    display: ${(props) => props.blankError};
    margin-bottom: 15px;
    color: var(--errorColor);
  }
`;
