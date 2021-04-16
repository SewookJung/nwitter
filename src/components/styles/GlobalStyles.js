import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
${reset}
a{
    text-decoration:none;
    color:inherit;
}
*{
    box-sizing:boerder-box;
}
body{
    font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 14px;
}
html, body {
    width: 100%;
    height: 100%;
}
#root {
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-columns: 200px 1fr;
    grid-template-rows: 1fr auto;
}
`;

export default GlobalStyles;
