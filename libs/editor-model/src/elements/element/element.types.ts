import { CommonUndoEvent, UndoRedoModule } from '@waveditors/rxjs-react';
import { UndoRedoEvents } from '../../types';

export type ElementCommon<T extends string = 'layout' | 'text' | 'image'> = {
  id: string;
  type: T;
};

export type ElementStoreDeps = {
  undoRedo: UndoRedoModule<UndoRedoEvents>;
};

export type ElementStoreUndoRedoEvent = CommonUndoEvent<
  'element',
  ElementCommon
>;
