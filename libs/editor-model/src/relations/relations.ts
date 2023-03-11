import {
  createStore,
  storeHookConstructor,
  StoreHookResult,
} from '@waveditors/rxjs-react';
import { Relations } from './relations.types';

const removeKey = <
  T extends Record<string | number, unknown>,
  K extends string | number
>(
  obj: T,
  key: K
) => {
  const { [key]: removed, ...newObj } = obj;
  return newObj;
};
export const relationsStore = () =>
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

export const useRelationsStore = storeHookConstructor(relationsStore);
export type RelationsStore = StoreHookResult<typeof relationsStore>;
