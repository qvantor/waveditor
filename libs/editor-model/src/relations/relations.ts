import {
  createStore,
  StoreHookResult,
  UndoRedoModule,
} from '@waveditors/rxjs-react';
import { removeKey } from '@waveditors/utils';
import { UndoRedoEvents } from '../types';
import { Relations } from './relations.types';

type Deps = {
  undoRedo: UndoRedoModule<UndoRedoEvents>;
};
export const relationsStoreConstructor = ({
  undoRedo: { createUndoRedoEffect },
}: Deps) =>
  createStore<Relations>()
    .addActions({
      addElementFontRelation: (
        { element, font }: { element: string; font: string },
        state
      ) => ({
        ...state,
        elementFont: {
          ...state.elementFont,
          [element]: font,
        },
      }),
      removeElementFontRelation: (element: string, state) => ({
        ...state,
        elementFont: removeKey(state.elementFont, element),
      }),
    })
    .addEffect(createUndoRedoEffect('RelationsStore'));

export type RelationsStore = StoreHookResult<typeof relationsStoreConstructor>;
