import { LayoutAddChild } from '@waveditors/editor-model';

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
export type MutationEvents =
  | LinkElementToLayoutEvent
  | UnlinkElementFromLayoutEvent;
export type EditorEvents = HoverEvents | SelectionEvents | MutationEvents;
