import { useNavigate } from "react-router-dom";

const ListItem = (props) => {
  const toDate = props.item.date.toDate();
  const itemDate = `${toDate.getMonth() + 1}/${toDate.getDate()}`;
  const navigate = useNavigate();

  return (
    <div
      className="ListItem"
      onClick={() => {
        navigate(`/board/${props.item.id}`);
      }}
    >
      <img
        className={`ListItem_Photo_${
          props.item.postPhoto === undefined ? "hidden" : "visible"
        }`}
        src={props.item.postPhoto}
        alt="임시테스트"
      />

      <div className="ListItem_box">
        <div className="ListItem_contents">
          <h3>{props.item.title}</h3>
          <p>{props.item.content}</p>
        </div>
        <div className="ListItem_info">
          <span>{itemDate}</span>
          <span>{props.item.userName}</span>
        </div>
      </div>
    </div>
  );
};
export default ListItem;
