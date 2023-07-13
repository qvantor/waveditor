import { createStore, StoreResult } from '@waveditors/rxjs-react';
import { removeKey } from '@waveditors/utils';
import { Element, ElementStore } from './elements.types';

type Params = {
  toStore: (element: Element) => ElementStore;
};
export const elementsStoreConstructor = ({ toStore }: Params) =>
  createStore<Record<string, ElementStore>>().addActions({
    addElement: (element: Element, current) => ({
      ...current,
      [element.id]: toStore(element),
    }),
    removeElement: (key: string, current) => removeKey(current, key),
  });

export type ElementsStore = StoreResult<typeof elementsStoreConstructor>;
