import { Element } from '../elements';

export type OutsideDragStartedEvent = {
  type: 'OutsideDragStarted';
  payload: Element;
};

export type EditorCommands =
  | OutsideDragStartedEvent
  | { type: 'test'; payload: number };
