import { Element } from "../elements";

export type OutsideDragStartedEvent = {
  type: 'OutsideDragStarted';
  payload: Element;
};

export type ExternalEvents =
  | OutsideDragStartedEvent
  | { type: 'test'; payload: number };
