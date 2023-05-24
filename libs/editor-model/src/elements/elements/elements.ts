import { createStore, StoreHookResult } from '@waveditors/rxjs-react';
import { removeKey } from '@waveditors/utils';
import { ElementStoreDeps } from '../element';
import { elementToElementStore } from './elements.creators';
import { Element, ElementStore } from './elements.types';

export const elementsStoreConstructor = ({
  undoRedo,
  variables,
}: ElementStoreDeps) =>
  createStore<Record<string, ElementStore>>()
    .addActions({
      addElement: (element: Element, current) => ({
        ...current,
        [element.id]: elementToElementStore(element, { undoRedo, variables }),
      }),
      removeElement: (key: string, current) => removeKey(current, key),
    })
    .addEffect(undoRedo.createUndoRedoEffect('ElementsStore'));

export type ElementsStore = StoreHookResult<typeof elementsStoreConstructor>;
