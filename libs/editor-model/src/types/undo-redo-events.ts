import {
  ElementsStoreUndoRedoEvent,
  ElementStoreUndoRedoEvent,
} from '../elements';
import { TemplateStoreUndoRedoEvent } from '../template-config';
import { RelationsStoreUndoRedoEvent } from '../relations';
import { VariablesStoreUndoRedoEvent } from '../variables';

export type UndoRedoEvents =
  | ElementsStoreUndoRedoEvent
  | ElementStoreUndoRedoEvent
  | TemplateStoreUndoRedoEvent
  | RelationsStoreUndoRedoEvent
  | VariablesStoreUndoRedoEvent;
