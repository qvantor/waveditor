import {
  createStore,
  storeHookConstructor,
  StoreHookResult,
} from '@waveditors/rxjs-react';
import { ElementStoreDeps } from '../element';
import { elementToElementStore } from './elements.creators';
import { Element, ElementStore } from './elements.types';

export const elementsStore = ({ undoRedo }: ElementStoreDeps) =>
  createStore<Record<string, ElementStore>>()
    .addActions({
      addElement: (element: Element, current) => {
        return {
          ...current,
          [element.id]: elementToElementStore(element, { undoRedo }),
        };
      },
      removeElement: (key: string, current) => {
        const copy = { ...current };
        delete copy[key];
        return copy;
      },
    })
    .addEffect(undoRedo.createUndoRedoEffect('ElementsStore'));

export const useElementsStore = storeHookConstructor(elementsStore);
export type ElementsStore = StoreHookResult<typeof elementsStore>;
