import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../index";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import DetailComment from "../components/DetailComment";
import { getCommentData, getPhoto, setInputState } from "../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

const Detail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const goBackBtn = () => {
    navigate(-1);
  };
  const user = useSelector((state) => state.loginUserData);

  const [detailData, setDetailData] = useState({});

  const [commentsData, setCommentsData] = useState([]);

  const [detailOption, setDetailOption] = useState(false);
  const [btnDisable, setBtnDisable] = useState(true);

  useEffect(() => {
    db.collection("post").onSnapshot((res) => {
      const findDetailItem = res.docs.find((ele) => ele.id === id);
      const toDate = findDetailItem.data().date.toDate();
      const date = `${toDate.getMonth() + 1}월 ${toDate.getDate()}일`;

      const formatData = {
        ...findDetailItem.data(),
        date: date,
      };
      setDetailData(formatData);
    });
    db.collection("post")
      .doc(id)
      .collection("comment")
      .onSnapshot((res) => {
        const getComment = res.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        const sortGetComment = getComment.sort((a, b) => b.date - a.date);
        setCommentsData(sortGetComment);
      });
  }, []);
  const [inputComment, setInputComment] = useState();

  const addComment = (e) => {
    e.preventDefault();

    const commentData = {
      comment: inputComment,
      userName: user.userName,
      userUid: user.userUid,
      userPhoto: user.userPhoto,
      date: new Date(),
    };
    db.collection("post").doc(id).collection("comment").add(commentData);
  };
  // 글 삭제하기 버튼 눌렀을 때 그 게시글 삭제해주기
  const deleteBtn = () => {
    db.collection("post").doc(id).delete();
    navigate("/board", { replace: true });
  };
  // 글 수정하기 버튼 눌렀을 때 수정페이지로 넘어감과 store에 데이터넣기
  const modifyBtn = () => {
    navigate(`/edit/${id}`);
    dispatch(
      setInputState({
        inputTitle: detailData.title,
        inputContent: detailData.content,
      })
    );
    dispatch(getPhoto(detailData.postPhoto));
  };

  return (
    <div
      className="Detail"
      onClick={() => {
        if (detailOption === true) {
          setDetailOption(false);
        }
      }}
    >
      <Header leftBtn={goBackBtn} centerTitle={"just talk"} />

      <div className="Detail_top">
        <h4>{detailData.title}</h4>
        <div className="Detail_info">
          <p>{detailData.userName}</p>
          <p>{detailData.date}</p>
        </div>
      </div>

      <div className="Detail_content">
        {detailData.postPhoto === undefined ? null : (
          <img src={detailData.postPhoto} alt="게시글 이미지" />
        )}
        <p>{detailData.content}</p>
        {user.userUid === detailData.userUid ? (
          <div className="Detail_content_option">
            <FontAwesomeIcon
              style={{
                cursor: "pointer",
                fontSize: "16px",
              }}
              icon={faEllipsisV}
              onClick={() => {
                setDetailOption(!detailOption);
              }}
            />
            {detailOption === false ? null : (
              <ul>
                <li onClick={modifyBtn}>수정하기</li>
                <li onClick={deleteBtn}>삭제하기</li>
              </ul>
            )}
          </div>
        ) : null}
      </div>
      <div className="Detail_comment">
        <h2
          className={user.userUid === "" ? "comment_noLogin" : null}
          style={{ marginTop: "15px", fontSize: "18px" }}
        >
          {commentsData.length} Comments
        </h2>
        {user.userUid ? (
          <form>
            <textarea
              value={inputComment}
              onChange={(e) => {
                setInputComment(e.target.value);
                if (e.target.value.length >= 1) {
                  setBtnDisable(false);
                } else {
                  setBtnDisable(true);
                }
              }}
              placeholder="Write a comment."
            />
            <button disabled={btnDisable} onClick={addComment}>
              댓글 작성
            </button>
          </form>
        ) : null}

        <div>
          {commentsData.map((items, i) => {
            return (
              <DetailComment
                addComment={addComment}
                detailId={id}
                items={items}
                key={i}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Detail;
