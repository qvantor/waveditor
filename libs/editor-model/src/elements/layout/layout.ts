import { StoreResult } from '@waveditors/rxjs-react';
import * as A from 'fp-ts/Array';
import * as O from 'fp-ts/Option';
import { flow, pipe } from 'fp-ts/function';
import { elementStore } from '../element';
import { Style } from '../../types';
import { Column, Layout, LayoutAddChild } from './layout.types';
import { createEmptyColumn } from './layout.creators';
import { recalcProportions } from './layout.services';
import {
  columnTraversal,
  columnStyle,
  columnChildren,
  columnByIndex,
  gap,
  column,
} from './layout.lens';

export const layoutStore = () =>
  elementStore<Layout>().addActions({
    addChild: (
      {
        element,
        position: { layout, column: colIndex, index },
      }: LayoutAddChild,
      prev
    ) =>
      column
        .composeOptional(columnByIndex(colIndex))
        .composeLens(columnChildren)
        .modify((children) =>
          pipe(
            children,
            A.insertAt(index, element),
            O.getOrElse(() => children)
          )
        )(prev),
    removeChild: (childId: string, prev) =>
      column
        .composeTraversal(columnTraversal)
        .composeLens(columnChildren)
        .modify(A.filter((child) => child !== childId))(prev),
    addColumn: (_, prev) =>
      column.modify(flow(A.append(createEmptyColumn()), recalcProportions))(
        prev
      ),
    removeColumn: (removeIndex: number, prev) => {
      if (prev.params.columns.length === 1)
        throw new Error(`removeColumn last column from ${prev.id}`);

      return column.modify((columns) =>
        pipe(
          columns,
          A.reduceWithIndex<Column, Column[]>([], (index, sum, column) => {
            if (
              (removeIndex === 0 && index - 1 === removeIndex) ||
              index + 1 === removeIndex
            ) {
              const { children: removedColChildren } = columns[removeIndex];
              return [
                ...sum,
                columnChildren.modify(A.concat(removedColChildren))(column),
              ];
            }
            if (index === removeIndex) return sum;
            return [...sum, column];
          }),
          recalcProportions
        )
      )(prev);
    },
    setColumnsProportions: (proportions: number[], prev) => {
      const { columns } = prev.params;
      if (columns.length !== proportions.length)
        throw new Error(
          `setColumnProportions error ${proportions.length} != ${prev.params.columns.length}`
        );

      return column.modify(
        flow(
          A.mapWithIndex((i, column) => ({
            ...column,
            proportion: proportions[i],
          }))
        )
      )(prev);
    },
    setColumnStyle: <K extends keyof Style>(
      { index, style }: { index: number; style: { key: K; value: Style[K] } },
      prev: Layout
    ) =>
      column
        .composeOptional(columnByIndex(index))
        .composeLens(columnStyle)
        .modify((prev) => ({ ...prev, [style.key]: style.value }))(prev),
    setGap: (newGap: number | undefined, prev) =>
      gap.modify(() => newGap)(prev),
  });

export type LayoutStore = StoreResult<typeof layoutStore>;
