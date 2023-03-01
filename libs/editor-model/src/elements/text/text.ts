import { StoreResult } from '@waveditors/rxjs-react';
import { elementStore, ElementStoreDeps } from '../element';
import { commonUndoRedoEffect } from '../../services';
import { Text } from './text.types';

export const textStore = (deps: ElementStoreDeps) =>
  elementStore<Text>().addEffect(commonUndoRedoEffect(deps.undoRedo));
export type TextStore = StoreResult<typeof textStore>;
