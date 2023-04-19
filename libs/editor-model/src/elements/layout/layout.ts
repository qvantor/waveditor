import { StoreResult } from '@waveditors/rxjs-react';
import { elementStore, ElementStoreDeps } from '../element';
import { commonUndoRedoEffect } from '../../services';
import { Layout, LayoutAddChild, Column } from './layout.types';
import { createEmptyColumn } from './layout.creators';

const setColumns = (layout: Layout, columns: Column[]) => ({
  ...layout,
  params: { ...layout.params, columns },
});

const setColumnChildren = (column: Column, children: string[]) => ({
  ...column,
  children,
});

export const layoutStore = (deps: ElementStoreDeps) =>
  elementStore<Layout>()
    .addActions({
      addChild: (
        { element, position: { layout, column, index, next } }: LayoutAddChild,
        prev
      ) => {
        const newColumns = prev.params.columns.map((col, i) => {
          if (i !== column) return col;
          const plus = next ? 1 : 0;
          return setColumnChildren(col, [
            ...col.children.slice(0, index + plus),
            element,
            ...col.children.slice(index + plus),
          ]);
        });
        return setColumns(prev, newColumns);
      },
      removeChild: (childId: string, prev) => {
        const newColumns = prev.params.columns.map((column) =>
          setColumnChildren(
            column,
            column.children.filter((cElementId) => cElementId !== childId)
          )
        );
        return setColumns(prev, newColumns);
      },
      addColumn: (_, prev) =>
        setColumns(prev, [...prev.params.columns, createEmptyColumn()]),
      removeColumn: (removeIndex: number, prev) => {
        if (prev.params.columns.length === 1)
          throw new Error(`removeColumn last column from ${prev.id}`);

        const columns = prev.params.columns.reduce<Column[]>(
          (sum, column, index) => {
            if (
              (removeIndex === 0 && index - 1 === removeIndex) ||
              index + 1 === removeIndex
            ) {
              const elementsFromRemoved = prev.params.columns[removeIndex];
              return [
                ...sum,
                setColumnChildren(column, [
                  ...column.children,
                  ...elementsFromRemoved.children,
                ]),
              ];
            }
            if (index === removeIndex) return sum;
            return [...sum, column];
          },
          []
        );
        return setColumns(prev, columns);
      },
    })
    .addEffect(commonUndoRedoEffect(deps.undoRedo));

export type LayoutStore = StoreResult<typeof layoutStore>;
