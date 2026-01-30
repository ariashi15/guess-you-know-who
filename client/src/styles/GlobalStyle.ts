import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --background: #8EBAE1;
    --red: #D0202D;
    --blue: #035094;
    --yellow: #FFEA00;
    --white: #FFFFFF;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: system-ui, sans-serif;
    background: var(--background);
  }
`;