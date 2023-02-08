import {
  ElementStoreUndoRedoEvent,
  LayoutStoreUndoRedoEvent,
} from '../elements';

export type UndoRedoEvents =
  | ElementStoreUndoRedoEvent
  | LayoutStoreUndoRedoEvent;
