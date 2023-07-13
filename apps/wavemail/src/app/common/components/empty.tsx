import styled from 'styled-components';
import { font, tokens } from '@waveditors/theme';
import { PropsWithChildren } from 'react';
import { AiOutlineInbox } from 'react-icons/ai';

const Root = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  color: ${tokens.color.text.secondary};
  ${font({ type: 'paragraph', size: 'medium' })}
`;

export const Empty = ({ children }: PropsWithChildren) => (
  <Root>
    <AiOutlineInbox />
    {children}
  </Root>
);
