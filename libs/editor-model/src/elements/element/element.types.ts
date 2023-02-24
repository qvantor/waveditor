import { CommonUndoEvent, UndoRedoModule } from '@waveditors/rxjs-react';
import { Property } from 'csstype';
import { Background, UndoRedoEvents } from '../../types';

export type ElementCommon<T extends string = 'layout' | 'text' | 'image'> = {
  id: string;
  type: T;

  style: {
    padding?: Property.Padding<string>;
  } & Background;
};

export type ElementStoreDeps = {
  undoRedo: UndoRedoModule<UndoRedoEvents>;
};

export type ElementStoreUndoRedoEvent = CommonUndoEvent<
  'element',
  ElementCommon
>;
