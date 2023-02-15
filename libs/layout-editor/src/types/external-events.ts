import { Element } from '@waveditors/editor-model';

export type OutsideDragStartedEvent = {
  type: 'OutsideDragStarted';
  payload: Element;
};

export type ExternalEvents =
  | OutsideDragStartedEvent
  | { type: 'test'; payload: number };
