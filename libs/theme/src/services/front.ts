import { css } from 'styled-components';
import { theme } from '../constants';

interface Params {
  type?: 'paragraph';
  size?: 'small' | 'medium' | 'large';
  weight?: 'light' | 'medium' | 'bold';
}

export const font = ({
  type = 'paragraph',
  size = 'medium',
  weight = 'medium',
}: Params) => css`
  font-weight: ${theme.fontWeight[weight]};
  ${theme.typography[type][size]}
`;
