import { BehaviorSubject } from 'rxjs';
import { CommonUndoEvent } from '@waveditors/rxjs-react';
import { LayoutStore } from '../layout';

export interface Text {
  id: string;
  type: 'text';
  params: {
    content: string;
  };
}

export type TextStore = { bs: BehaviorSubject<Text> };

export interface Img {
  id: string;
  type: 'image';
  params: {
    url: string;
  };
}

export type ImgStore = { bs: BehaviorSubject<Img> };
export type ElementStore = LayoutStore | TextStore | ImgStore;
export type Element = ElementStore['bs']['value'];
export type ElementType = ElementStore['bs']['value']['type'];

export type ElementStoreUndoRedoEvent = CommonUndoEvent<
  'ElementsStore',
  Record<string, unknown>
>;
