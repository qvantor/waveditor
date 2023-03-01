import { CommonUndoEvent, UndoRedoModule } from '@waveditors/rxjs-react';
import { Property } from 'csstype';
import { Background, UndoRedoEvents } from '../../types';

export const ElementCommonTypes = ['layout', 'text', 'image'] as const;

export type ElementCommon<
  T extends string = (typeof ElementCommonTypes)[number]
> = {
  id: string;
  type: T;

  link?: {
    url: string;
  };
  style: {
    display?: Property.Display;
    padding?: Property.Padding<string>;
    maxWidth?: Property.MaxWidth<string>;
    fontSize?: string;
    lineHeight?: string;
    letterSpacing?: string;
    textAlign?: Property.TextAlign;
    color?: Property.Color;
  } & Background;
};

export type ElementStoreDeps = {
  undoRedo: UndoRedoModule<UndoRedoEvents>;
};

export type ElementStoreUndoRedoEvent = CommonUndoEvent<
  'element',
  ElementCommon
>;
