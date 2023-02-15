import { StoreResult } from '@waveditors/rxjs-react';
import { elementStore, ElementStoreDeps } from '../element';
import { Layout, LayoutAddChild } from './layout.types';

const setColumns = (layout: Layout, columns: string[][]) => ({
  ...layout,
  params: { ...layout.params, columns },
});

export const layoutStore = (deps: ElementStoreDeps) =>
  elementStore<Layout>(deps).addActions({
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
  });

export type LayoutStore = StoreResult<typeof layoutStore>;
