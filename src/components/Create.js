import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setInputState } from "../store";
import PreviewPhoto from "../util/PreviewPhoto";
import { useState } from "react";

const Create = (props) => {
  const inputState = useSelector((state) => state.inputState);
  const dispatch = useDispatch();

  const [preview, setPreview] = useState("");
  const onChangePreview = async (e) => {
    const getPreviewPhoto = await PreviewPhoto(e.target.files[0]);
    setPreview(getPreviewPhoto);
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
              <img src={preview === undefined ? null : preview} alt="테스트" />
              <DeletePhoto
                onClick={() => {
                  setPreview("");
                  props.setInputPhoto("");
                }}
              >
                X
              </DeletePhoto>
            </div>
          )}
        </div>
        <button onClick={props.createBtn}>작성하기</button>
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
