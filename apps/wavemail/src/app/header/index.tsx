import styled from 'styled-components';
import { tokens } from '@waveditors/theme';

const Root = styled.div`
  height: ${tokens.size.headerHeight};
  background: ${tokens.color.surface.tertiary};
`;
export const Header = () => {
  return <Root onClick={() => console.log('ok')} />;
};
