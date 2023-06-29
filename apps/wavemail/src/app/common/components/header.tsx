import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { tokens } from '@waveditors/theme';
import { BsSoundwave } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { CONTROL_PANEL } from '../constants';

const Root = styled.div`
  height: ${tokens.size.headerHeight};
  background: ${tokens.color.surface.tertiary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 10px;
`;
const Logo = styled(BsSoundwave)`
  height: ${tokens.size.headerHeight};
  font-size: 28px;
  color: ${tokens.color.text.tertiary};
  background: ${tokens.color.surface.tertiary};
  padding: 0 6px;
  cursor: pointer;
  transition: all 0.3s ease-in;

  &:hover {
    background: ${tokens.color.surface.tertiaryHover};
  }
`;

export const Header = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  return (
    <Root>
      <Logo onClick={() => navigate(CONTROL_PANEL)} />
      {children}
    </Root>
  );
};
