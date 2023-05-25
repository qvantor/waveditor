import styled from 'styled-components';
import { useBuilderContext } from '@waveditors/editor-model';
import { font, theme } from '@waveditors/theme';
import { RxDragHandleDots2 } from 'react-icons/rx';
import { useCallback } from 'react';
import { useLayoutEditorContext, useSelectedElement } from '../../hooks';

const CONTROL_HEIGHT = 16;

const Root = styled.div<{ top: boolean; $width: number }>`
  background: ${theme.color.surface.accent};
  position: absolute;
  height: ${CONTROL_HEIGHT}px;
  color: ${theme.color.text.tertiary};
  ${font({ type: 'paragraph', size: 'smallest' })}
  right: 0;
  ${({ top }) =>
    top ? `top: -${CONTROL_HEIGHT}px;` : `bottom: -${CONTROL_HEIGHT}px;`}
  padding: 0 4px;
  z-index: 1;
  pointer-events: all;
  cursor: grab;
  display: flex;
  align-items: center;
  gap: 5px;
  max-width: ${({ $width }) => Math.max($width, 60)};
`;

const Icon = styled(RxDragHandleDots2)`
  flex-shrink: 0;
`;

const Name = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

interface Props {
  top: number;
  width: number;
}

export const FrameControl = ({ top, width }: Props) => {
  const {
    model: { config },
    interaction: { selected },
  } = useBuilderContext();
  const { internalEvents } = useLayoutEditorContext();
  const element = useSelectedElement();
  const onMouseDown = useCallback(() => {
    const payload = selected.getValue();
    if (!payload) return console.error('DragIconMouseDown selected is empty');
    internalEvents.next({ type: 'DragIconMouseDown', payload });
  }, [internalEvents, selected]);

  if (!element || element.id === config.getValue().rootElementId) return null;
  return (
    <Root top={top >= CONTROL_HEIGHT} $width={width} onMouseDown={onMouseDown}>
      <Icon />
      <Name>{element.name ?? element.type}</Name>
    </Root>
  );
};
