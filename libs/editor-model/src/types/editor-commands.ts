import { Element } from '../elements';

export type OutsideDragStartedEvent = {
  type: 'OutsideDragStarted';
  payload: Element;
};

export type OutsideDragToClickEvent = {
  type: 'OutsideDragToClick';
};

export type EditorCommands = OutsideDragStartedEvent | OutsideDragToClickEvent;
