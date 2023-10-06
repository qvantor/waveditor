import { memo } from 'react';
import {
  ConfigStore,
  EditorSnapshot,
  useBuilderContext,
} from '@waveditors/editor-model';
import styled from 'styled-components';
import { font, tokens } from '@waveditors/theme';
import { RenderPreview } from '@waveditors/layout-render';
import { ComponentsQuery } from '../graphql/components.g';

const componentToPreview = (
  component: EditorSnapshot,
  config: ConfigStore
): EditorSnapshot => ({
  ...component,
  config: {
    ...component.config,
    fonts:
      component.config.fonts.length === 0
        ? [config.getValue().fonts[0]]
        : component.config.fonts,
    style: {
      margin: '0px',
      overflow: 'hidden',
    },
  },
});

const Hover = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgb(18 20 23 / 60%);
  z-index: 1;
  opacity: 0;
  transition: opacity 0.15s ease-in;
`;

const Root = styled.div`
  width: 100%;
  border: 1px solid ${tokens.color.border.primary};
  border-radius: ${tokens.borderRadius.m};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  position: relative;

  &:hover ${Hover} {
    opacity: 1;
  }
`;
const Name = styled.h5`
  margin: 0;
  padding: 0 10px;
  height: 100%;
  display: flex;
  align-items: center;
  color: ${tokens.color.text.tertiary};
  ${font({ type: 'paragraph', size: 'small', weight: 'bold' })}
`;
const PreviewContainer = styled.div`
  transform-origin: top left;
`;

const PreviewInternal = styled(RenderPreview)`
  pointer-events: none;
  border-radius: ${tokens.borderRadius.m};
`;
export const ComponentPreview = memo(
  ({
    component,
    height,
    scale,
  }: {
    component: ComponentsQuery['components'][0];
    height: number;
    scale: number;
  }) => {
    const {
      model: { config },
    } = useBuilderContext();
    const componentWidth = component.json.config.viewportWidth as number;
    const componentHeight = component.previewHeight;
    return (
      <Root style={{ height }}>
        <Hover>
          <Name>{component.name}</Name>
        </Hover>
        <div
          style={{
            height: componentHeight * scale,
            width: componentWidth * scale,
          }}
        >
          <PreviewContainer
            style={{ width: componentWidth, transform: `scale(${scale})` }}
          >
            <PreviewInternal
              style={{ height: componentHeight }}
              title={component.name}
              snapshot={componentToPreview(component.json, config)}
            />
          </PreviewContainer>
        </div>
      </Root>
    );
  }
);
