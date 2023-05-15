import { LayoutStore, isLayoutStore, isParentOf } from '../layout';
import { ElementsStore } from './elements';
import { ElementStore } from './elements.types';

export const getParentElement = (
  elementsStore: ElementsStore['bs']['value'],
  id: string
): LayoutStore | null => {
  const parent = Object.entries(elementsStore).find(
    (element): element is [string, LayoutStore] => {
      if (!isLayoutStore(element[1])) return false;
      return isParentOf(element[1].getValue(), id);
    }
  );
  return parent ? parent[1] : null;
};

export const getLayoutElement = (
  elementsStore: ElementsStore['bs']['value'],
  id: string
) => {
  const layout = elementsStore[id];
  if (!layout || !isLayoutStore(layout)) return null;
  return layout;
};

export const getElementById =
  (id: string) =>
  (elementsStore: ElementsStore['bs']['value']): ElementStore | undefined =>
    elementsStore[id];

export const getElementParents =
  (id: string, sum: LayoutStore[] = []) =>
  (elementsStore: ElementsStore['bs']['value']): LayoutStore[] => {
    const parent = getParentElement(elementsStore, id);
    if (!parent) return sum;
    return getElementParents(parent.getValue().id, [...sum, parent])(
      elementsStore
    );
  };
