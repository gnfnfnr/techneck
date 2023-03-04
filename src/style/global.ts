import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
    ${reset}    

    :root {
        --width-max: 1080px;
        --main-color: #eaeaea;
        --main-color-op: #6B6B6B;
        --height-header: 60px;
    }
    
    body{
        scroll-behavior: smooth;   
        background-color: var(--main-color);
    }
`;
