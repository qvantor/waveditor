import React from 'react';
import styled from 'styled-components';
import { tokens } from '@waveditors/theme';
import { ElementCreation } from './components';

const Root = styled.div`
  background: ${tokens.color.surface.secondary};
  border-right: 1px solid ${tokens.color.border.primary};
`;

export const LeftSidebar = () => {
  return (
    <Root>
      <ElementCreation />
    </Root>
  );
};
