import React, { useCallback } from 'react';
import { ElementType, useBuilderContext } from '@waveditors/editor-model';
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
        payload: typeToElement(type),
      }),
    [commands, typeToElement]
  );
  const onClick = useCallback(
    () => commands.next({ type: 'OutsideDragToClick' }),
    [commands]
  );
  return <CommonCreateElement onClick={onClick} onMouseDown={onMouseDown} />;
};
