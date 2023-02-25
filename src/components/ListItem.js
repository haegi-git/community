import { useNavigate } from "react-router-dom";

const ListItem = (props) => {
  const toDate = props.item.date.toDate();
  const itemDate = `${toDate.getFullYear()}년 ${
    toDate.getMonth() + 1
  }월 ${toDate.getDate()}일`;
  const navigate = useNavigate();

  return (
    <div
      className="ListItem"
      onClick={() => {
        navigate(`/board/${props.item.id}`);
      }}
    >
      {props.item.postPhoto ? (
        <div className="ListItem_photo">
          <img src={props.item.postPhoto} alt="게시글 이미지" />
        </div>
      ) : null}

      <div className="ListItem_content">
        <h4>{props.item.title}</h4>
        <div className="ListItem_maintext">
          <p>{props.item.content}</p>
        </div>
      </div>
      <div className="ListItem_bottom">
        <div className="ListItem_userInfo">
          <img src={props.item.userPhoto} alt="유저 이미지" />
          <span>{props.item.userName}</span>
        </div>
        <p>{itemDate}</p>
      </div>
    </div>
  );
};
export default ListItem;
