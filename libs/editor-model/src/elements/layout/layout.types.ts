import { CommonUndoEvent } from '@waveditors/rxjs-react';

export interface Layout {
  id: string;
  type: 'layout';
  params: {
    columns: string[][];
  };
}

export interface LayoutAddChild {
  element: string;
  position: {
    layout: string;
    column: number;
    index: number;
    next: boolean;
  };
}

export type LayoutStoreUndoRedoEvent = CommonUndoEvent<'layout', Layout>;
