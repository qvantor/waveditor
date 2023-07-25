import { Element, LayoutAddChild } from '../elements';

export type HoverEvents =
  | { type: 'MouseEnter'; payload: string }
  | { type: 'MouseLeave'; payload: null };
export type SelectionEvents =
  | { type: 'ElementSelected'; payload: string }
  | { type: 'ElementUnselected'; payload: null };

export type LinkElementToLayoutEvent = {
  type: 'LinkElementToLayout';
  payload: LayoutAddChild & { samePosition: boolean };
};
export type UnlinkElementFromLayoutEvent = {
  type: 'UnlinkElementFromLayout';
  payload: string;
};
export type AddElementEvent = {
  type: 'AddElement';
  payload: { element: Element; position?: LayoutAddChild['position'] };
};
export type MutationEvents =
  | AddElementEvent
  | LinkElementToLayoutEvent
  | UnlinkElementFromLayoutEvent;

export type ShowAddElementControlEvent = {
  type: 'ShowAddElementControl';
  payload: {
    controlPosition: { left: number; top: number };
    elementPosition: LayoutAddChild['position'];
  };
};

export type UIEvents = ShowAddElementControlEvent;

export type CanvasScrollEvent = {
  type: 'CanvasScroll';
  payload: Event;
};

export type CanvasEvents = CanvasScrollEvent;
export type EditorEvents =
  | HoverEvents
  | SelectionEvents
  | MutationEvents
  | UIEvents
  | CanvasEvents;
