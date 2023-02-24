import { createGlobalStyle, css } from 'styled-components';
import { themeCss, tokens } from '../constants';

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

  p {
    margin: 0;
  }
`;

export const EmptyPattern = css`
  background-image: repeating-linear-gradient(
      45deg,
      ${tokens.color.surface.primary} 25%,
      transparent 25%,
      transparent 75%,
      ${tokens.color.surface.primary} 75%,
      ${tokens.color.surface.primary}
    ),
    repeating-linear-gradient(
      45deg,
      ${tokens.color.surface.primary} 25%,
      ${tokens.color.surface.secondary} 25%,
      ${tokens.color.surface.secondary} 75%,
      ${tokens.color.surface.primary} 75%,
      ${tokens.color.surface.primary}
    );
  background-position: 0 0, 10px 10px;
  background-size: 20px 20px;
`;
