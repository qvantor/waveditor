import React from 'react';
import styled from 'styled-components';
import { LayoutEditor } from '@waveditors/layout-editor';
import { tokens } from '@waveditors/theme';
import { useMailBuilderContext } from '../../common/hooks';

const Root = styled.div`
  background-color: ${tokens.color.surface.primary};
  background-image: radial-gradient(
    #a8b0b5 0.5px,
    ${tokens.color.surface.primary} 0.5px
  );
  background-size: 10px 10px;
  height: calc(
    100vh - ${tokens.size.headerHeight} - ${tokens.size.footerHeight}
  );
  overflow-y: scroll;
`;

const CanvasContainer = styled.div`
  padding: 30px 0;
  scroll-padding-bottom: 30px;
  display: flex;
  justify-content: center;
`;

export const Canvas = () => {
  const {
    config,
    stores: { elements, selected, hover },
    editor: { events, externalEvents },
  } = useMailBuilderContext();
  return (
    <Root onClick={selected.actions.unselect}>
      <CanvasContainer>
        <LayoutEditor
          root='1'
          config={config.bs}
          elements={elements.bs}
          events={events}
          externalEvents={externalEvents}
          hover={hover.bs}
          selected={selected.bs}
        />
      </CanvasContainer>
    </Root>
  );
};
