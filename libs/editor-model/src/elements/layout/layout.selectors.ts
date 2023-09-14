import { ElementStore, getElementById } from '../elements';
import { LayoutStore } from './layout';
import { LayoutAddChild } from './layout.types';
import { isLayoutStore } from './layout.guards';

export const getColumns = (layout: LayoutStore['bs']['value']) =>
  layout.params.columns;

export const getColumnsCount = (layout: LayoutStore['bs']['value']) =>
  getColumns(layout).length;

export const getGap = (layout: LayoutStore['bs']['value']) => layout.params.gap;

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

export const getLayoutChildren =
  (elements: Record<string, ElementStore>) =>
  (layout: LayoutStore['bs']['value']): ElementStore[] =>
    layout.params.columns.reduce<ElementStore[]>(
      (sum, col) => [
        ...sum,
        ...col.children
          .map((child) => {
            const element = getElementById(child)(elements) as ElementStore;
            if (isLayoutStore(element))
              return [
                element,
                ...getLayoutChildren(elements)(element.getValue()),
              ];
            return element;
          })
          .flat(),
      ],
      []
    );
