import { createStore, StoreResult } from '@waveditors/rxjs-react';
import { removeKey } from '@waveditors/utils';
import { Relations } from './relations.types';

export const relationsStoreConstructor = () =>
  createStore<Relations>().addActions({
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
  });

export type RelationsStore = StoreResult<typeof relationsStoreConstructor>;
