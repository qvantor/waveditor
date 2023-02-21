import { createGlobalStyle } from 'styled-components';
import { themeCss } from '../constants';

export const GlobalStyle = createGlobalStyle`
  * {
    outline: none;
    ${themeCss}
  }

  body {
    margin: 0;
    padding: 0;
  }
`;
