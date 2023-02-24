import { createGlobalStyle } from 'styled-components';
import { themeCss } from '../constants';

export const GlobalStyle = createGlobalStyle`
  * {
    outline: none;
    font-family: 'Montserrat', sans-serif;
    ${themeCss}
  }

  body {
    margin: 0;
    padding: 0;
  }
`;
