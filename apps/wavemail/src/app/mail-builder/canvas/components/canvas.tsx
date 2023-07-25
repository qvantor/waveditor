import React from 'react';
import styled, { css } from 'styled-components';
import { LayoutEditor } from '@waveditors/layout-editor';
import { tokens, font } from '@waveditors/theme';
import { useBuilderContext } from '@waveditors/editor-model';
import { useBsSelector } from '@waveditors/rxjs-react';
import { RenderPreview } from '@waveditors/layout-render';
import { BsClockHistory } from 'react-icons/bs';
import { useVersionsContext, getPreview } from '../../versions';
import { SelectedToRoot } from './selected-to-root';
import { CreateElementPopover } from './create-element-popover';

const CanvasHeight = css`
  height: calc(
    100vh - ${tokens.size.headerHeight} - ${tokens.size.footerHeight}
  );
`;

const Root = styled.div`
  height: calc(100vh - ${tokens.size.headerHeight});
  position: relative;
`;

const CanvasRoot = styled.div`
  background-color: ${tokens.color.surface.primary};
  background-image: radial-gradient(
    #a8b0b5 0.5px,
    ${tokens.color.surface.primary} 0.5px
  );
  background-size: 10px 10px;
  ${CanvasHeight};
`;

const CanvasContainer = styled.div`
  scroll-padding-bottom: 30px;
  display: flex;
  justify-content: center;
`;

const LayoutEditorInternal = styled(LayoutEditor)`
  ${CanvasHeight}
`;

const RenderPreviewInternal = styled(RenderPreview)`
  ${CanvasHeight}
`;
const PreviewWarning = styled.div`
  display: flex;
  align-items: center;
  height: calc(${tokens.size.footerHeight});
  background: ${tokens.color.surface.accent};
  color: ${tokens.color.text.tertiary};
  ${font({ weight: 'light' })}
  padding: 0 10px;
  gap: 10px;
  justify-content: center;

  span {
    ${font({ weight: 'medium' })}
  }
`;
const Footer = styled.div`
  height: calc(${tokens.size.footerHeight} - 1px);
  background: ${tokens.color.surface.secondary};
  border-top: 1px solid ${tokens.color.border.primary};
`;

export const Canvas = () => {
  const {
    interaction: { selected },
  } = useBuilderContext();
  const versions = useVersionsContext();
  const preview = useBsSelector(versions.bs, getPreview);

  return (
    <Root>
      <CreateElementPopover />
      <CanvasRoot onClick={selected.actions.unselect}>
        <CanvasContainer>
          {preview ? (
            <RenderPreviewInternal
              snapshot={preview.snapshot}
              title={preview.name}
            />
          ) : (
            <LayoutEditorInternal />
          )}
        </CanvasContainer>
      </CanvasRoot>
      {preview ? (
        <PreviewWarning>
          <BsClockHistory />
          <div>
            <span>{preview.name}</span> preview
          </div>
        </PreviewWarning>
      ) : (
        <Footer>
          <SelectedToRoot />
        </Footer>
      )}
    </Root>
  );
};
