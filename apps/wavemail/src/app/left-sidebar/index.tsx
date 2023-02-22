import React from 'react';
import styled from 'styled-components';
import { map } from 'rxjs';
import { tokens } from '@waveditors/theme';
import { useObservable } from '@waveditors/rxjs-react';
import { useMailBuilderContext } from '../common/hooks';
import { ElementCreation } from './components';
import { StyleEditor } from './style-editor';

const Root = styled.div`
  background: ${tokens.color.surface.secondary};
  border-right: 1px solid ${tokens.color.border.primary};
`;

export const LeftSidebar = () => {
  const {
    stores: { selected, elements },
  } = useMailBuilderContext();
  const element = useObservable(
    selected.bs.pipe(
      map((selected) => (selected ? elements.bs.value[selected] : null))
    ),
    null
  );
  return <Root>{element ? <StyleEditor element={element}/> : <ElementCreation />}</Root>;
};
