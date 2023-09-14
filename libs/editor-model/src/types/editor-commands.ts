import { Element } from '../elements';
import { EditorSnapshot } from './editor-snapshot';

export type OutsideDragStartedEvent = {
  type: 'OutsideDragStarted';
  payload:
    | { type: 'element'; element: Element }
    | { type: 'component'; element: EditorSnapshot };
};

export type OutsideDragToClickEvent = {
  type: 'OutsideDragToClick';
};

export type EditorCommands = OutsideDragStartedEvent | OutsideDragToClickEvent;
