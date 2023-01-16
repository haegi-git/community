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
      const toDate = findDetailItem.data().date.toDate();
      const date = `${toDate.getMonth() + 1} / ${toDate.getDate()}`;

      const formatData = {
        ...findDetailItem.data(),
        date: date,
      };
      setDetailData(formatData);
    });
  }, []);

  return (
    <div className="Detail">
      <Header leftBtn={goBackBtn} />

      <div className="Detail_top">
        <h3>{detailData.title}</h3>
        <div className="Detail_user">
          <p>{detailData.userName} |</p>
          <p>{detailData.date}</p>
        </div>
      </div>

      <div className="Detail_content">
        {detailData.postPhoto === undefined ? null : (
          <img src={detailData.postPhoto} alt="게시글 이미지" />
        )}
        <h3>{detailData.content}</h3>
        <div className="Detail_content_btn">
          <button>수정하기</button>
          <button>삭제하기</button>
        </div>
      </div>
    </div>
  );
};
export default Detail;
