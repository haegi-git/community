import {
  faArrowLeft,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../index";
import { setLoginUserData } from "../store";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  text-align: center;
  @media screen and (min-width: 1024px) {
    position: fixed;
    width: 100%;
    left: 0;
    top: ${(props) => (props.scroll >= 100 ? "-100px" : "0")};
    height: 70px;
    z-index: 20;
    background-color: var(--mainColor);
    transition: all 0.5s;
  }
`;

const SideHeaderBtnBox = styled.div`
  width: 25%;
  display: flex;
  height: 100%;
  :first-child {
    justify-content: start;
    @media screen and (min-width: 1024px) {
      padding-left: 15px;
    }
  }
  :last-child {
    justify-content: end;
    @media screen and (min-width: 1024px) {
      padding-right: 15px;
    }
  }
  & button {
    border: none;
    font-size: 22px;
    background-color: var(--mainColor);
    cursor: pointer;
  }
`;
const CenterHeaderTextBox = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
`;

const Header = (props) => {
  const [menu, setMenu] = useState(false);
  const [scroll, setScroll] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.loginUserData);
  const logoutBtn = () => {
    auth.signOut();
    dispatch(
      setLoginUserData({
        userName: "",
        userUid: "",
        userPhoto: "",
      })
    );
  };
  const updateScroll = () => {
    setScroll(window.scrollY || document.documentElement.scrollTop);
  };
  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
  });

  const myPageBtn = () => {
    if (user.userUid.length > 1) {
      navigate("/mypage");
    } else {
      alert("로그인을 해주세요.");
    }
  };
  return (
    <>
      <HeaderContainer scroll={scroll}>
        <SideHeaderBtnBox style={{ visibility: props.leftVisible }}>
          <button onClick={props.leftBtn}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        </SideHeaderBtnBox>
        <CenterHeaderTextBox>
          <h3>{props.centerTitle}</h3>
        </CenterHeaderTextBox>
        <SideHeaderBtnBox style={{ visibility: props.rightVisible }}>
          <button
            onClick={() => {
              setMenu(!menu);
            }}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </SideHeaderBtnBox>
      </HeaderContainer>
      <SideMenu menu={menu}>
        <FontAwesomeIcon
          onClick={() => {
            setMenu(!menu);
          }}
          style={{
            position: "absolute",
            top: "10px",
            right: "15px",
            fontSize: "32px",
            cursor: "pointer",
          }}
          icon={faXmark}
        />
        <div className="menu_user">
          {user.userPhoto ? (
            <img src={user.userPhoto} alt="유저이미지" />
          ) : null}
          <h4>{user.userName}</h4>
        </div>
        <ul>
          <li
            onClick={() => {
              navigate("/board");
              setMenu(false);
            }}
          >
            Home
          </li>
          <li onClick={myPageBtn}>My Page</li>
        </ul>
        <ul>
          {user.userUid ? (
            <li onClick={logoutBtn}>Log Out</li>
          ) : (
            <li
              onClick={() => {
                navigate("/");
              }}
            >
              Login
            </li>
          )}
        </ul>
      </SideMenu>
    </>
  );
};
export default React.memo(Header);

const SideMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 200px;
  height: 100%;
  background-color: var(--mainColor);
  color: var(--fontColor);
  z-index: 21;
  box-shadow: -1px 0px 4px 3px rgba(0, 0, 0, 0.2);
  transition: all 0.5s;
  transform: ${(props) =>
    props.menu === false ? "translateX(210px)" : "transform: translateX(0px)"};
  & > .menu_user {
    margin-top: 70px;
    text-align: center;
    margin-bottom: 30px;
  }
  & > .menu_user > img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 10px;
  }
  & > ul {
    text-align: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  }
  & > ul > li {
    margin-bottom: 15px;
    margin-top: 15px;
    padding: 15px;
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, 0.3);
    }
    &:active {
      background-color: rgba(0, 0, 0, 0.3);
    }
  }
`;
