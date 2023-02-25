import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getPhoto, setInputState } from "../store";
import PreviewPhoto from "../util/PreviewPhoto";
import { useEffect, useState } from "react";

const Create = (props) => {
  const dispatch = useDispatch();
  const inputState = useSelector((state) => state.inputState);
  const editPreviewPhoto = useSelector((state) => state.editPreviewPhoto);

  const [preview, setPreview] = useState("");

  useEffect(() => {
    // 상세페이지 수정할 때 상세페이지 이미지를 받아올 곳
    // 수정이라면 이미지파일을 글생성이라면 "" 공백을 받아온다.
    setPreview(editPreviewPhoto);
  }, []);
  // 이미지 미리보기 함수인데 함수를 분리시켜줘서 코드가짧고 미리볼 url을 preview로 넣는다.
  const onChangePreview = async (e) => {
    const getPreviewPhoto = await PreviewPhoto(e.target.files[0]);
    setPreview(getPreviewPhoto);
  };
  // 이미지 미리보기 삭제할 함수 / 이미지 업로드파일 삭제
  const deletePhotoBtn = () => {
    setPreview("");
    props.setInputPhoto("");
    dispatch(getPhoto(""));
  };

  const createBtn = () => {
    if (inputState.inputTitle.length < 1) {
      alert("제목이 공백임");
    } else if (inputState.inputContent.length < 1) {
      alert("본문이 공백임");
    } else {
      props.createBtn();
    }
  };
  return (
    <div className="Create">
      <input
        value={inputState.inputTitle}
        type="text"
        placeholder="Please enter a title."
        onChange={(e) => {
          dispatch(
            setInputState({
              ...inputState,
              inputTitle: e.target.value,
            })
          );
        }}
      />
      <textarea
        onChange={(e) => {
          dispatch(
            setInputState({
              ...inputState,
              inputContent: e.target.value,
            })
          );
        }}
        value={inputState.inputContent}
        placeholder="Please enter the text."
      />
      <div className="Create_Photo_box">
        <div style={{ display: "flex" }}>
          <label htmlFor="uploadPhoto">
            <FontAwesomeIcon icon={faImage} />
          </label>
          {preview === "" ? null : (
            <div style={{ position: "relative" }}>
              <img
                src={preview === "" ? editPreviewPhoto : preview}
                alt="테스트"
              />
              <DeletePhoto onClick={deletePhotoBtn}>X</DeletePhoto>
            </div>
          )}
        </div>
        <button onClick={createBtn}>{props.btnText}</button>
      </div>
      <input
        onChange={(e) => {
          onChangePreview(e);
          props.setInputPhoto(e.target.files[0]);
        }}
        type="file"
        style={{ display: "none" }}
        id="uploadPhoto"
      />
    </div>
  );
};
export default Create;

const DeletePhoto = styled.p`
  position: absolute;
  display: flex;
  top: 5px;
  right: 5px;
  background-color: rgba(0, 0, 0, 0.3);
  color: #fff;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  justify-content: center;
  border: none;
`;
