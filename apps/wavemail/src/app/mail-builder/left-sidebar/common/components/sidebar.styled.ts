import styled from 'styled-components';
import { font, tokens } from '@waveditors/theme';

export const SidebarHeader = styled.div`
  padding: 0 8px;
  height: 34px;
  border-bottom: 1px solid ${tokens.color.border.primary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${font({ weight: 'bold', size: 'small' })}
  color: ${tokens.color.text.secondary}
`;
