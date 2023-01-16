import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../index";
import Header from "../components/Header";

const Detail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const goBackBtn = () => {
    navigate(-1);
  };

  const [detailData, setDetailData] = useState({});

  useEffect(() => {
    db.collection("post").onSnapshot((res) => {
      const findDetailItem = res.docs.find((ele) => ele.id === id);
      setDetailData(findDetailItem.data());
    });
  }, []);
  console.log(detailData);
  return (
    <div className="Detail">
      <Header leftBtn={goBackBtn} />

      <div className="Detail_top">
        <h3>제목</h3>
        <div className="Detail_user">
          <p>작성자 |</p>
          <p>날짜</p>
        </div>
      </div>

      <div className="Detail_content"></div>
    </div>
  );
};
export default Detail;
