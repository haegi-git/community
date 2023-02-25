import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../index";
import Create from "../components/Create";
import Header from "../components/Header";
import StorageUpload from "../util/StorageUpload";

const Edit = () => {
  const navigate = useNavigate();
  const inputState = useSelector((state) => state.inputState);
  const { id } = useParams();
  const goBackBtn = () => {
    navigate(-1);
  };
  const [inputPhoto, setInputPhoto] = useState();
  const getPhotoFile = (e) => {
    setInputPhoto(e);
  };
  const modifyBtn = async () => {
    if (inputPhoto) {
      const url = await StorageUpload("image/", inputPhoto.name, inputPhoto);
      const dbUpdateData = {
        title: inputState.inputTitle,
        content: inputState.inputContent,
        postPhoto: url,
      };
      db.collection("post").doc(id).update(dbUpdateData);
    } else {
      const dbUpdateData = {
        title: inputState.inputTitle,
        content: inputState.inputContent,
      };
      db.collection("post").doc(id).update(dbUpdateData);
    }
    navigate("/board", { replace: true });
  };
  return (
    <div className="Edit">
      <Header leftBtn={goBackBtn} centerTitle="Edit" />
      <Create
        setInputPhoto={getPhotoFile}
        createBtn={modifyBtn}
        btnText="수정하기"
      />
    </div>
  );
};
export default Edit;
