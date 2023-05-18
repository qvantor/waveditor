import { LayoutStore } from './layout';
import { LayoutAddChild } from './layout.types';

export const getColumns = (layout: LayoutStore['bs']['value']) =>
  layout.params.columns;

export const isParentOf = (
  layout: LayoutStore['bs']['value'],
  elementId: string
) =>
  Boolean(
    layout.params.columns.find((column) =>
      column.children.find((cElementId) => cElementId === elementId)
    )
  );

export const getElementPosition = (
  layout: LayoutStore['bs']['value'],
  element: string
) =>
  layout.params.columns.reduce<LayoutAddChild['position']>(
    (sum, col, index) => {
      if (!col.children.includes(element)) return sum;
      return {
        ...sum,
        column: index,
        index: col.children.indexOf(element),
      };
    },
    {
      layout: layout.id,
      column: 0,
      index: 0,
    }
  );
