import {
  createStore,
  storeHookConstructor,
  StoreHookResult,
  UndoRedoModule,
} from '@waveditors/rxjs-react';
import { UndoRedoEvents } from '../../types';
import { ElementStore } from './elements.types';

interface ElementsStoreDeps {
  undoRedo: UndoRedoModule<UndoRedoEvents>;
}

export const elementsStore = ({
  undoRedo: { createUndoRedoEffect },
}: ElementsStoreDeps) =>
  createStore<Record<string, ElementStore>>()
    .addActions({
      addElement: (value: ElementStore, current) => {
        // return { ...current, [value.value.id]: value }; //@todo uncomment after all elements will be instance of the store
        return current;
      },
      removeElement: (key: string, current) => {
        const copy = { ...current };
        delete copy[key];
        return copy;
      },
    })
    .addEffect(createUndoRedoEffect('ElementsStore'));

export const useElementsStore = storeHookConstructor(elementsStore);
export type ElementsStore = StoreHookResult<typeof elementsStore>;
