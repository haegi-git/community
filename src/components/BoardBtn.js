import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styled from "styled-components";

const BoardBtn = (props) => {
  const [btnDisabled, setBtnDisabled] = useState({
    latest: true,
    oldest: false,
  });
  const [btnVal, setBtnVal] = useState(true);

  const latestDisabled = () => {
    setBtnDisabled({
      latest: true,
      oldest: false,
    });
  };
  const oldestDisabled = () => {
    setBtnDisabled({
      latest: false,
      oldest: true,
    });
  };
  return (
    <BoardBtnContainer>
      <BoardSort>
        <button
          className={`sort_${btnDisabled.latest}`}
          onClick={(e) => {
            latestDisabled();
            setBtnVal(true);
            props.sortBtn(btnVal);
          }}
          disabled={btnDisabled.latest}
        >
          Latest
        </button>
        <button
          className={`sort_${btnDisabled.oldest}`}
          onClick={(e) => {
            oldestDisabled();
            setBtnVal(false);
            props.sortBtn(btnVal);
          }}
          disabled={btnDisabled.oldest}
        >
          Oldest
        </button>
        <div className={`bottom_line_${btnDisabled.latest}`}></div>
      </BoardSort>
      <button onClick={props.postingBtn}>
        Writing <FontAwesomeIcon icon={faPen} />
      </button>
    </BoardBtnContainer>
  );
};
export default BoardBtn;

const BoardBtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  width: 100%;
  & > button {
    border: none;
    background-color: var(--mainColor);
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  }
`;

const BoardSort = styled.div`
  display: flex;
  width: 7rem;
  position: relative;
  & > button {
    margin-right: 15px;
    background-color: var(--mainColor);
    border: none;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  }
  & > div {
    width: 44%;
    height: 2px;
    background-color: black;
    position: absolute;
    bottom: -5px;
    transition: all 0.5s;
  }
  & > .bottom_line_true {
    left: 0;
  }
  & > .bottom_line_false {
    left: 57%;
  }
  & > .sort_true {
    color: black;
  }
  & > .sort_false {
    color: rgba(0, 0, 0, 0.4);
  }
`;
