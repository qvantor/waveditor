import { CommonUndoEvent, UndoRedoModule } from '@waveditors/rxjs-react';
import { Style, UndoRedoEvents } from '../../types';

export const ElementCommonTypes = ['layout', 'text', 'image'] as const;

export type ElementLink = {
  url: string;
  newTab: boolean;
};

export type ElementCommon<
  T extends string = (typeof ElementCommonTypes)[number]
> = {
  id: string;
  type: T;

  link: ElementLink | null;

  style: Style;
};

export type ElementStoreDeps = {
  undoRedo: UndoRedoModule<UndoRedoEvents>;
};

export type ElementStoreUndoRedoEvent = CommonUndoEvent<
  'element',
  ElementCommon
>;
