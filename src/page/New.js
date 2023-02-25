import { useState } from "react";
import { db } from "../index";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import StorageUpload from "../util/StorageUpload";
import Create from "../components/Create.js";
import { useNavigate } from "react-router-dom";

const New = () => {
  const navigate = useNavigate();
  const inputState = useSelector((state) => state.inputState);
  const user = useSelector((state) => state.loginUserData);

  const goBackBtn = () => {
    navigate(-1);
  };

  const [inputPhoto, setInputPhoto] = useState();

  const getPhotoFile = (e) => {
    setInputPhoto(e);
  };

  const postingUpload = async (e) => {
    const setData = {
      userName: user.userName,
      userUid: user.userUid,
      userPhoto: user.userPhoto,
      title: inputState.inputTitle,
      content: inputState.inputContent,
      date: new Date(),
    };
    if (inputPhoto) {
      const url = await StorageUpload("image/", inputPhoto.name, inputPhoto);
      const setPhotoData = { ...setData, postPhoto: url };

      db.collection("post")
        .add(setPhotoData)
        .then(() => {
          navigate("/board");
        });
    } else {
      db.collection("post")
        .add(setData)
        .then(() => {
          navigate("/board");
        });
    }
  };
  return (
    <div className="New">
      <Header leftBtn={goBackBtn} centerTitle={"Writing"} />

      <Create
        setInputPhoto={getPhotoFile}
        createBtn={postingUpload}
        btnText="작성하기"
      />
    </div>
  );
};
export default New;
