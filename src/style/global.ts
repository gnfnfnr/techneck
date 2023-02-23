import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
    ${reset}    
    
    body{
        scroll-behavior: smooth;   
        background-color: #EAEAEA;
    }
`;
