import { UndoRedoModule } from '@waveditors/rxjs-react';
import { UndoRedoEvents } from '../types';
import { Element } from '../elements';

export const commonUndoRedoEffect = <V extends Element, A>({
  createUndoRedoEffect,
}: UndoRedoModule<UndoRedoEvents>) =>
  createUndoRedoEffect<V, A, 'element'>('element', {
    filter: ({ payload }, value) => payload.next.id === value.id,
  });
