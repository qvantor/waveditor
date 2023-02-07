import { BehaviorSubject } from 'rxjs';

export interface Layout {
  id: string;
  type: 'layout';
  params: {
    columns: string[][];
  };
}

export type LayoutStore = BehaviorSubject<Layout>;

export interface Text {
  id: string;
  type: 'text';
  params: {
    content: string;
  };
}

export type TextStore = BehaviorSubject<Text>;

export interface Img {
  id: string;
  type: 'image';
  params: {
    url: string;
  };
}

export type ImgStore = BehaviorSubject<Img>;

export type ElementStore = LayoutStore | TextStore | ImgStore;
export type ElementsStore = BehaviorSubject<Record<string, ElementStore>>;
