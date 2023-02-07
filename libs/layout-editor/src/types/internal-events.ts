import { MouseEvent } from 'react';

export type RootMouseMoveEvent = { type: 'RootMouseMove'; payload: MouseEvent };
export type InternalMouseEvents =
  | RootMouseMoveEvent
  | { type: 'RootClick'; payload: MouseEvent }
  | { type: 'RootMouseLeave'; payload: MouseEvent };

export type DragIconMouseDownEvent = {
  type: 'DragIconMouseDown';
  payload: string;
};
export type InternalDndEvents = DragIconMouseDownEvent;

export type InternalEvents = InternalMouseEvents | InternalDndEvents;
