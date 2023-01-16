import Header from "../components/Header";
import { auth, db } from "../index";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import { useEffect, useState } from "react";
import ListItem from "../components/ListItem";
import { useNavigate } from "react-router-dom";
import Pagination from "react-js-pagination";

const Board = () => {
  const navigate = useNavigate();
  const [listData, setListData] = useState([]);
  useEffect(() => {
    db.collection("post").onSnapshot((res) => {
      const getDatabaseData = res.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setListData(getDatabaseData);
    });
  }, []);

  const [page, setPage] = useState(1);
  const [items, setItems] = useState(5);
  const handelPage = (page) => {
    setPage(page);
  };
  return (
    <div className="Board">
      <Header leftVisible={"hidden"} centerTitle={"Board"} />

      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        modules={[Autoplay]}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="slide_wrap"
      >
        <SwiperSlide>
          <h1>공지사항 1</h1>
        </SwiperSlide>
        <SwiperSlide>
          <h1>공지사항 2</h1>
        </SwiperSlide>
        <SwiperSlide>
          <h1>공지사항 3</h1>
        </SwiperSlide>
      </Swiper>

      <div className="Board_btn_box">
        <div className="Board_sort">
          <p>latest</p>
          <p>oldest</p>
        </div>
        <div className="Board_addbtn_box">
          <button
            onClick={() => {
              navigate("/new");
            }}
          >
            글 작성
          </button>
        </div>
      </div>

      <div className="Board_List">
        {listData
          .slice(items * (page - 1), items * (page - 1) + items)
          .map((item, i) => {
            return <ListItem item={item} key={i} />;
          })}
      </div>
      <div className="pagination">
        <Pagination
          activePage={page}
          itemsCountPerPage={5}
          totalItemsCount={listData.length}
          pageRangeDisplayed={5}
          onChange={handelPage}
        />
      </div>
    </div>
  );
};

export default Board;
