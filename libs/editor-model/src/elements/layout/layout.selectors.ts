import { LayoutStore } from './layout';
import { LayoutAddChild } from './layout.types';

export const isParentOf = (
  layout: LayoutStore['bs']['value'],
  elementId: string
) =>
  Boolean(
    layout.params.columns.find((column) =>
      column.find((cElementId) => cElementId === elementId)
    )
  );

export const getElementPosition = (
  layout: LayoutStore['bs']['value'],
  element: string
) =>
  layout.params.columns.reduce<LayoutAddChild['position']>(
    (sum, col, index) => {
      if (!col.includes(element)) return sum;
      return {
        ...sum,
        column: index,
        index: col.indexOf(element),
      };
    },
    {
      layout: layout.id,
      column: 0,
      index: 0,
      next: false,
    }
  );
