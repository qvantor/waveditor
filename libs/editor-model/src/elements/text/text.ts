import { StoreResult } from '@waveditors/rxjs-react';
import { JSONContent } from '@tiptap/core';
import { elementStore, ElementStoreDeps } from '../element';
import { commonUndoRedoEffect } from '../../services';
import { Text } from './text.types';

export const textStore = (deps: ElementStoreDeps) =>
  elementStore<Text>()
    .addActions({
      setContent: (content: JSONContent, prev) => ({
        ...prev,
        params: {
          ...prev.params,
          content,
        },
      }),
    })
    .addEffect(commonUndoRedoEffect(deps.undoRedo));
export type TextStore = StoreResult<typeof textStore>;
