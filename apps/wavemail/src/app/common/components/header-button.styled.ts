import styled from 'styled-components';
import { tokens } from '@waveditors/theme';

export const HeaderButton = styled.button`
  background: transparent;
  border: none;
  color: ${tokens.color.text.tertiary};
  height: ${tokens.size.headerHeight};
  cursor: pointer;
`;
