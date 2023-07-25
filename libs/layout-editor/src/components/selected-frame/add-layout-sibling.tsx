import styled from 'styled-components';
import {
  getElementPosition,
  getParentElement,
  LayoutStore,
  useBuilderContext,
} from '@waveditors/editor-model';
import { AiOutlinePlus } from 'react-icons/ai';
import { theme } from '@waveditors/theme';
import { MouseEvent } from 'react';

const Common = styled.div`
  position: absolute;
  left: 0;
  font-size: 12px;
  height: 14px;
  width: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.color.surface.accent};
  color: ${theme.color.text.tertiary};
  cursor: pointer;
  pointer-events: all;
  transition: all 0.2s ease-in;

  &:hover {
    background: ${theme.color.surface.accentHover};
  }
`;
const After = styled(Common)`
  bottom: -14px;
`;

interface Props {
  element: LayoutStore;
}

export const AddLayoutSibling = ({ element }: Props) => {
  const {
    model: { elements },
    editor: { events },
  } = useBuilderContext();
  const onClick = (after: boolean) => (e: MouseEvent) => {
    e.stopPropagation();
    const elementId = element.getValue().id;
    const parent = getParentElement(elements.getValue(), elementId);
    if (!parent) return;
    const position = getElementPosition(parent.getValue(), elementId);
    const rect = (e.target as HTMLElement).getBoundingClientRect();

    events.next({
      type: 'ShowAddElementControl',
      payload: {
        elementPosition: {
          ...position,
          index: position.index + Number(after),
        },
        controlPosition: {
          left: rect.left,
          top: rect.top + rect.height,
        },
      },
    });
  };
  return (
    <After onClick={onClick(true)}>
      <AiOutlinePlus />
    </After>
  );
};
