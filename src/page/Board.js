import Header from "../components/Header";
import { auth, db } from "../index";
import "swiper/css";
import React, { useEffect, useState } from "react";
import ListItem from "../components/ListItem";
import { useNavigate } from "react-router-dom";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { getPhoto, setInputState } from "../store";
import Slide from "../components/Slide";
import BoardBtn from "../components/BoardBtn";

const Board = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.loginUserData);
  const [listData, setListData] = useState([]);
  useEffect(() => {
    db.collection("post").onSnapshot((res) => {
      const getDatabaseData = res.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      getDatabaseData.sort((a, b) => b.date - a.date);
      setListData(getDatabaseData);
    });
  }, []);

  const [page, setPage] = useState(1);
  const [items, setItems] = useState(5);
  const handelPage = (page) => {
    setPage(page);
  };

  // BoardBtn에 보내줄 함수들 (글작성, 최신순 오래된순 정렬기능)

  const newPostingBtn = () => {
    if (user.userUid.length > 1) {
      navigate("/new");
      dispatch(
        setInputState({
          inputTitle: "",
          inputContent: "",
        })
      );
      dispatch(getPhoto(""));
    } else {
      alert("로그인을 해주세요.");
    }
  };

  const sortBtn = (value) => {
    let sortArr = [...listData];
    if (true === value) {
      sortArr = sortArr.sort((a, b) => a.date - b.date);
    } else {
      sortArr = sortArr.sort((a, b) => b.date - a.date);
    }
    setListData(sortArr);
  };
  return (
    <div className="Board">
      <Header leftVisible={"hidden"} centerTitle={"Board"} />

      <Slide />

      <BoardBtn sortBtn={sortBtn} postingBtn={newPostingBtn} />

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

export default React.memo(Board);
