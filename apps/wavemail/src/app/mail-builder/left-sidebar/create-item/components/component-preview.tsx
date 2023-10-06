import { memo, useCallback } from 'react';
import {
  ConfigStore,
  EditorSnapshot,
  useBuilderContext,
} from '@waveditors/editor-model';
import styled from 'styled-components';
import { font, tokens } from '@waveditors/theme';
import { RenderPreview } from '@waveditors/layout-render';
import { AiOutlineDelete } from 'react-icons/ai';
import { Popconfirm } from 'antd';
import { ComponentsQuery } from '../graphql/components.g';
import { IconButton } from '../../../../common/components';
import { useDeleteComponentMutation } from '../graphql/delete-component.g';
import { client } from '../../../../common/services';

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

const HoverContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  height: calc(100% - 14px);
  padding: 7px;
`;
const HoverHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
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

interface Props {
  component: ComponentsQuery['components'][0];
  height: number;
  scale: number;
  edit: boolean;
}

export const ComponentPreview = memo(
  ({ component, height, scale, edit }: Props) => {
    const [deleteComponent, { loading }] = useDeleteComponentMutation();
    const {
      model: { config },
    } = useBuilderContext();
    const componentWidth = component.json.config.viewportWidth as number;
    const componentHeight = component.previewHeight;
    const deleteInternal = useCallback(async () => {
      await deleteComponent({ variables: { id: component.id } });
      client.cache.modify({
        id: client.cache.identify(component),
        fields: (ref, { DELETE }) => DELETE,
      });
    }, [component, deleteComponent]);
    return (
      <Root style={{ height }}>
        <Hover>
          <HoverContainer>
            <HoverHeader>
              {edit && (
                <div onMouseDown={(e) => e.stopPropagation()}>
                  <Popconfirm
                    title={`Delete ${component.name}?`}
                    placement='bottomRight'
                    disabled={loading}
                    onConfirm={deleteInternal}
                  >
                    <IconButton
                      icon={<AiOutlineDelete />}
                      size='small'
                      ghost
                      disabled={loading}
                    />
                  </Popconfirm>
                </div>
              )}
            </HoverHeader>
            <Name>{component.name}</Name>
          </HoverContainer>
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
