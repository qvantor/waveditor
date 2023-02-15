import { CommonUndoEvent } from '@waveditors/rxjs-react';
import { LayoutStore } from '../layout';
import { TextStore } from '../text';
import { ImageStore } from '../image';

export type ElementStore = LayoutStore | TextStore | ImageStore;
export type Element = ElementStore['bs']['value'];
export type ElementType = ElementStore['bs']['value']['type'];

export type ElementsStoreUndoRedoEvent = CommonUndoEvent<
  'ElementsStore',
  Record<string, unknown>
>;
