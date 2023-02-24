import { CommonUndoEvent } from '@waveditors/rxjs-react';

export type Relations = {
  elementFont: Record<string, string>; // one(elementId) to one(fontId) relation
};

export type RelationsStoreUndoRedoEvent = CommonUndoEvent<
  'RelationsStore',
  Relations
>;
