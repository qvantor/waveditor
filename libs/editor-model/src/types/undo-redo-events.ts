import {
  ElementsStoreUndoRedoEvent,
  ElementStoreUndoRedoEvent,
} from '../elements';
import { ConfigStoreUndoRedoEvent } from '../config';
import { RelationsStoreUndoRedoEvent } from '../relations';
import { VariablesStoreUndoRedoEvent } from '../variables';

export type UndoRedoEvents =
  | ElementsStoreUndoRedoEvent
  | ElementStoreUndoRedoEvent
  | ConfigStoreUndoRedoEvent
  | RelationsStoreUndoRedoEvent
  | VariablesStoreUndoRedoEvent;
