import { faArrowLeft, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const SideHeaderBtnBox = styled.div`
  width: 25%;
  display: flex;
  :first-child {
    justify-content: start;
  }
  :last-child {
    justify-content: end;
  }
  & button {
    border: none;
    background-color: gray;
    padding: 20px;
    font-size: 22px;
  }
`;
const CenterHeaderTextBox = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
`;

const Header = (props) => {
  return (
    <HeaderContainer>
      <SideHeaderBtnBox style={{ visibility: props.leftVisible }}>
        <button onClick={props.leftBtn}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </SideHeaderBtnBox>
      <CenterHeaderTextBox>
        <h2>{props.centerTitle}</h2>
      </CenterHeaderTextBox>
      <SideHeaderBtnBox style={{ visibility: props.rightVisible }}>
        <button>
          <FontAwesomeIcon icon={faBars} />
        </button>
      </SideHeaderBtnBox>
    </HeaderContainer>
  );
};
export default Header;
