import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'Melon Pop';
        src: url('/fonts/melon_pop/Melon Pop.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
    }

    @font-face {
        font-family: 'Roboto';
        src: url('/fonts/roboto/Roboto-VariableFont_wdth,wght.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
    }

    @font-face {
        font-family: 'Roboto-Bold';
        src: url('/fonts/roboto/Roboto-Medium.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
    }

    :root {
        --background: #8EBAE1;
        --red: #D0202D;
        --blue: #035094;
        --yellow: #ebd800;
        --font-header: 'Melon Pop', sans-serif;
        --font-body: 'Roboto', sans-serif;
        --font-body-bold: 'Roboto-Bold', sans-serif;
    }

    *, *::before, *::after {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        font-family: var(--font-body), system-ui, sans-serif;
        background: var(--background);
    }

    input {
        font-family: inherit;
    }
    
    button, h1, h2, h3, h4, h5, h6 {
        font-family: var(--font-header);
    }
`;