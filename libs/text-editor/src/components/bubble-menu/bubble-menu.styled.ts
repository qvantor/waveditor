import styled, { css } from 'styled-components';
import { theme } from '@waveditors/theme';

export const Group = styled.div`
  display: flex;
  gap: 2px;
  background: ${theme.color.surface.primary};
  border-radius: ${theme.borderRadius.l};
  padding: 3px 5px;
`;

export const BubbleButton = styled.button<{ active: boolean }>`
  height: 20px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.borderRadius.m};
  cursor: pointer;

  ${({ active }) =>
    active &&
    css`
      color: ${theme.color.text.accent};
    `}
  & > svg {
    font-size: 16px;
  }

  &:hover {
    background: ${theme.color.surface.primaryHover};
  }
`;
