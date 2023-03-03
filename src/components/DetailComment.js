import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../index";

const DetailComment = (props) => {
  const [commentOption, setCommentOption] = useState(false);
  const [modifyInput, setModifyInput] = useState("");
  const [modifyState, setModifyState] = useState(false);
  const user = useSelector((state) => state.loginUserData);

  const toDate = props.items.date.toDate();
  const commentDate = `${toDate.getMonth() + 1}월${toDate.getDate()}일`;

  useEffect(() => {
    setCommentOption(false);
  }, [props.addComment]);

  const deleteComment = () => {
    db.collection("post")
      .doc(props.detailId)
      .collection("comment")
      .doc(props.items.id)
      .delete();
  };
  const handelModify = (e) => {
    e.preventDefault();
    setModifyInput(e.target.value);
  };
  const modifyComment = (e) => {
    e.preventDefault();
    db.collection("post")
      .doc(props.detailId)
      .collection("comment")
      .doc(props.items.id)
      .update({ comment: modifyInput });
    setModifyState(false);
  };

  const optionModify = () => {
    setModifyState(!modifyState);
    setModifyInput(props.items.comment);
  };

  return (
    <div
      className="DetailComment"
      onClick={() => {
        if (commentOption === true) {
          setCommentOption(!commentOption);
        }
      }}
    >
      <div className="DetailComment_image">
        <img src={props.items.userPhoto} alt="댓글 유저 이미지" />
      </div>
      <div className="DetailComment_text">
        <div className="DetailComment_text_top">
          <div>
            <h4>{props.items.userName}</h4>
            <p>{commentDate}</p>
          </div>
          {user.userUid === props.items.userUid ? (
            <FontAwesomeIcon
              icon={faEllipsisV}
              onClick={(e) => {
                setCommentOption(!commentOption);
              }}
            />
          ) : null}

          <ul className={`Comment_option Comment_option_${commentOption}`}>
            <li onClick={optionModify}>수정하기</li>
            <li onClick={deleteComment}>삭제하기</li>
          </ul>
        </div>

        <p>{props.items.comment}</p>
        {modifyState === false ? null : (
          <form>
            <input
              style={{ backgroundColor: "var(--inputColor)" }}
              onChange={handelModify}
              value={modifyInput}
            />
            <div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setModifyState(false);
                }}
              >
                취소
              </button>
              <button onClick={modifyComment}>수정</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
export default DetailComment;
