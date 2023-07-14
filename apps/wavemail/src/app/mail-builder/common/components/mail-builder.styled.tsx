import styled from 'styled-components';
import { tokens } from '@waveditors/theme';

export const MailBuilderRoot = styled.div`
  height: 100vh;
`;
export const Content = styled.div`
  height: calc(100vh - ${tokens.size.headerHeight});
  display: grid;
  grid-template-columns: 330px 1fr;
  justify-content: center;
  background: ${tokens.color.surface.primary};
  overflow: hidden;
`;

export const SidebarRoot = styled.div`
  background: ${tokens.color.surface.secondary};
  border-right: 1px solid ${tokens.color.border.primary};
  height: calc(100vh - ${tokens.size.headerHeight});
  overflow: hidden;
  display: grid;
  grid-template-columns: 40px 1fr;
`;
