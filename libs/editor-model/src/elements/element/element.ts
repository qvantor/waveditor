import { createStore } from '@waveditors/rxjs-react';
import { ElementCommon, ElementStoreDeps } from './element.types';

export const elementStore = <T extends ElementCommon>({
  undoRedo: { createUndoRedoEffect },
}: ElementStoreDeps) =>
  createStore<T>().addEffect(
    createUndoRedoEffect('element', {
      filter: (event, value) => event.payload.next.id === value.id,
    })
  );
