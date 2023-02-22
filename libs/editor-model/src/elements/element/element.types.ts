import { CommonUndoEvent, UndoRedoModule } from '@waveditors/rxjs-react';
import * as CSS from 'csstype';
import { UndoRedoEvents } from '../../types';

export type ElementCommon<T extends string = 'layout' | 'text' | 'image'> = {
  id: string;
  type: T;

  style: Pick<CSS.Properties<string | number>, 'padding'>;
};

export type ElementStoreDeps = {
  undoRedo: UndoRedoModule<UndoRedoEvents>;
};

export type ElementStoreUndoRedoEvent = CommonUndoEvent<
  'element',
  ElementCommon
>;
