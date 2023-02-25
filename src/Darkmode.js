import { createGlobalStyle } from "styled-components";

const Darkmode = createGlobalStyle`
    #root{
        transition: all 1s;
        ${(props) =>
          props.dark === true
            ? "--mainColor:#252525; --whiteColor : #323232; --inputColor:#424242"
            : "--mainColor:#f7f7f7; --whiteColor : #fff"}
        }
        > div {
            transition: all 1s;
        }
`;
export default Darkmode;
