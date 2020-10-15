import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Inter", sans-serif;
        line-height: 1.5;
        -webkit-tap-highlight-color: transparent;
    }
`;

export default GlobalStyle;
