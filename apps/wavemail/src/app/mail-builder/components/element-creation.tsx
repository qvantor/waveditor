import React, { useCallback } from 'react';
import styled from 'styled-components';
import { createInitialElement, ElementType } from '@waveditors/editor-model';
import { useMailBuilderContext } from '../common/hooks';

const Root = styled.div`
  user-select: none;
`;

export const ElementCreation = () => {
  const {
    editor: { externalEvents },
  } = useMailBuilderContext();
  const onMouseDown = useCallback(
    (type: ElementType) => () =>
      externalEvents.next({
        type: 'OutsideDragStarted',
        payload: createInitialElement(type),
      }),
    [externalEvents]
  );
  return (
    <Root>
      <div onMouseDown={onMouseDown('layout')}>layout</div>
      <div onMouseDown={onMouseDown('text')}>text</div>
    </Root>
  );
};
