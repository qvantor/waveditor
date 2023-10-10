import { Element, LayoutAddChild, Position } from '../elements';
import { EditorSnapshot } from './editor-snapshot';

export type HoverEvents =
  | { type: 'MouseEnter'; payload: string }
  | { type: 'MouseLeave'; payload: null };
export type SelectionEvents =
  | { type: 'ElementSelected'; payload: string }
  | { type: 'ElementUnselected'; payload: null };

export type LinkElementToLayoutEvent = {
  type: 'LinkElementToLayout';
  payload: Omit<LayoutAddChild, 'position'> & {
    position: LayoutAddChild['position'] & { samePosition: boolean };
  };
};
export type UnlinkElementFromLayoutEvent = {
  type: 'UnlinkElementFromLayout';
  payload: string;
};
export type AddElementEvent = {
  type: 'AddElement';
  payload: { element: Element; position: Position | null };
};
export type AddComponentEvent = {
  type: 'AddComponent';
  payload: { element: EditorSnapshot; position: Position | null };
};
export type MutationEvents =
  | AddElementEvent
  | AddComponentEvent
  | LinkElementToLayoutEvent
  | UnlinkElementFromLayoutEvent;

export type ShowAddElementControlEvent = {
  type: 'ShowAddElementControl';
  payload: {
    controlPosition: { left: number; top: number };
    elementPosition: Position;
  };
};

export type UIEvents = ShowAddElementControlEvent;

export type CanvasScrollEvent = {
  type: 'CanvasScroll';
  payload: Event;
};

export type CanvasKeyDownEvent = {
  type: 'CanvasKeyDown';
  payload: KeyboardEvent;
};

export type CanvasEvents = CanvasScrollEvent | CanvasKeyDownEvent;
export type EditorEvents =
  | HoverEvents
  | SelectionEvents
  | MutationEvents
  | UIEvents
  | CanvasEvents;
