import { StoreResult } from '@waveditors/rxjs-react';
import { Lens, fromTraversable, Prism } from 'monocle-ts';
import { indexArray } from 'monocle-ts/Index/Array';
import { Traversable, filter } from 'fp-ts/Array';
import { elementStore, ElementStoreDeps } from '../element';
import { commonUndoRedoEffect } from '../../services';
import { Align } from '../../types';
import { Layout, LayoutAddChild, Column } from './layout.types';
import { createEmptyColumn } from './layout.creators';
import { recalcProportions } from './layout.services';

const column = Lens.fromPath<Layout>()(['params', 'columns']);

const columnChildren = Lens.fromProp<Column>()('children');

const columnByIndex = (index: number) => indexArray<Column>().index(index);
const columnTraversal = fromTraversable(Traversable)<Column>();
const getChildPrism = (id: string): Prism<string, string> =>
  Prism.fromPredicate((child) => child === id);

const childTraversal = fromTraversable(Traversable)<string>();

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
        {
          element,
          position: { layout, column: colIndex, index, next },
        }: LayoutAddChild,
        prev
      ) =>
        column
          .composeOptional(columnByIndex(colIndex))
          .composeLens(columnChildren)
          .modify((children) => [
            ...children.slice(0, index + Number(next)),
            element,
            ...children.slice(index + Number(next)),
          ])(prev),
      removeChild: (childId: string, prev) =>
        column
          .composeTraversal(columnTraversal)
          .composeLens(columnChildren)
          .modify(filter((child) => child !== childId))(prev),
      addColumn: (_, prev) => {
        return setColumns(
          prev,
          recalcProportions([...prev.params.columns, createEmptyColumn()])
        );
      },
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
        return setColumns(prev, recalcProportions(columns));
      },
      setColumnsProportions: (proportions: number[], prev) => {
        const { columns } = prev.params;
        if (columns.length !== proportions.length)
          throw new Error(
            `setColumnProportions error ${proportions.length} != ${prev.params.columns.length}`
          );
        return setColumns(
          prev,
          prev.params.columns.map((column, i) => ({
            ...column,
            proportion: proportions[i],
          }))
        );
      },
      setColumnAlign: (
        { index, align }: { index: number; align?: Align },
        prev
      ) =>
        setColumns(
          prev,
          prev.params.columns.map((column, i) =>
            i === index ? { ...column, align } : column
          )
        ),
    })
    .addEffect(commonUndoRedoEffect(deps.undoRedo));

export type LayoutStore = StoreResult<typeof layoutStore>;
