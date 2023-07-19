import { CommonUndoEvent } from '@waveditors/rxjs-react';
import { Style } from '../../types';
import { VariablesStore } from '../../variables';

export const ElementCommonTypes = ['layout', 'text', 'image'] as const;
export type ElementTypes = (typeof ElementCommonTypes)[number];

export type ElementLink = {
  url: string;
  newTab: boolean;
};

export type ElementCommon<T extends string = ElementTypes> = {
  id: string;
  type: T;
  name?: string;

  link: ElementLink | null;

  style: Style;
};

export type ElementStoreDeps = {
  // undoRedo: UndoRedoModule<UndoRedoEvents>;
  variables: VariablesStore;
};

export type ElementStoreUndoRedoEvent = CommonUndoEvent<
  'element',
  ElementCommon
>;
