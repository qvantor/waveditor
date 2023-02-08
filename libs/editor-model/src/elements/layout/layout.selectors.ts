import { LayoutStore } from './layout';

export const isParentOf = (
  layout: LayoutStore['bs']['value'],
  elementId: string
) =>
  Boolean(
    layout.params.columns.find((column) =>
      column.find((cElementId) => cElementId === elementId)
    )
  );
