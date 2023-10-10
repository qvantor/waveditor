import styled, { css } from 'styled-components';

// component for hiding element without remove it from dom tree
export const Hider = styled.div<{ isHidden: boolean }>`
  height: 100%;
  ${({ isHidden }) =>
    isHidden &&
    css`
      height: 0;
      overflow: hidden;
    `}
`;
