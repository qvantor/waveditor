import {
  createStore,
  StoreResult,
  UndoRedoModule,
} from '@waveditors/rxjs-react';
import { UndoRedoEvents } from '../../types';
import { Layout, LayoutAddChild } from './layout.types';

const setColumns = (layout: Layout, columns: string[][]) => ({
  ...layout,
  params: { ...layout.params, columns },
});

interface ElementsStoreDeps {
  undoRedo: UndoRedoModule<UndoRedoEvents>;
}

export const layoutStore = ({
  undoRedo: { createUndoRedoEffect },
}: ElementsStoreDeps) => {
  return createStore<Layout>()
    .addActions({
      addChild: (
        { element, position: { layout, column, index, next } }: LayoutAddChild,
        prev
      ) => {
        const newColumns = prev.params.columns.map((col, i) => {
          if (i !== column) return col;
          const plus = next ? 1 : 0;
          return [
            ...col.slice(0, index + plus),
            element,
            ...col.slice(index + plus),
          ];
        });
        return setColumns(prev, newColumns);
      },
      removeChild: (childId: string, prev) => {
        const newColumns = prev.params.columns.map((column) =>
          column.filter((cElementId) => cElementId !== childId)
        );
        return setColumns(prev, newColumns);
      },
    })
    .addEffect(
      createUndoRedoEffect('layout', {
        filter: (event, value) => event.payload.next.id === value.id,
      })
    );
};

export type LayoutStore = StoreResult<typeof layoutStore>;
