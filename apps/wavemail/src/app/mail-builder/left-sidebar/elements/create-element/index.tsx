import React, { useCallback } from 'react';
import {
  EditorSnapshot,
  ElementType,
  useBuilderContext,
} from '@waveditors/editor-model';
import { CreateElement as CommonCreateElement } from '../../../common/components';
import { useTypeToElement } from '../../../common/hooks';

export const CreateElement = () => {
  const {
    editor: { commands },
  } = useBuilderContext();
  const typeToElement = useTypeToElement();
  const onMouseDown = useCallback(
    (type: ElementType) =>
      commands.next({
        type: 'OutsideDragStarted',
        payload: { type: 'element', element: typeToElement(type) },
      }),
    [commands, typeToElement]
  );
  const onClick = useCallback(
    () => commands.next({ type: 'OutsideDragToClick' }),
    [commands]
  );

  const onTextDown = () => {
    // @ts-ignore
    const element = window.__component as EditorSnapshot;
    if (!element) return console.log('no component');
    commands.next({
      type: 'OutsideDragStarted',
      payload: { type: 'component', element },
    });
  };
  return (
    <>
      <CommonCreateElement onClick={onClick} onMouseDown={onMouseDown} />
      <div onMouseDown={onTextDown}>test component</div>
    </>
  );
};
