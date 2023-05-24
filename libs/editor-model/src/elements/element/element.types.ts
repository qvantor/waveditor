import { CommonUndoEvent, UndoRedoModule } from '@waveditors/rxjs-react';
import { Style, UndoRedoEvents } from '../../types';
import { VariablesStore } from '../../variables';

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
  name?: string;

  link: ElementLink | null;

  style: Style;
};

export type ElementStoreDeps = {
  undoRedo: UndoRedoModule<UndoRedoEvents>;
  variables: VariablesStore;
};

export type ElementStoreUndoRedoEvent = CommonUndoEvent<
  'element',
  ElementCommon
>;
