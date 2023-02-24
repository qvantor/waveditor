import {
  ElementsStoreUndoRedoEvent,
  ElementStoreUndoRedoEvent,
} from '../elements';
import { TemplateStoreUndoRedoEvent } from '../template-config';
import { RelationsStoreUndoRedoEvent } from '../relations';

export type UndoRedoEvents =
  | ElementsStoreUndoRedoEvent
  | ElementStoreUndoRedoEvent
  | TemplateStoreUndoRedoEvent
  | RelationsStoreUndoRedoEvent;
