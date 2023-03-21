import { LayoutStore, isLayoutStore, isParentOf } from '../layout';
import { ElementsStore } from './elements';

export const getParentElement = (
  elementsStore: ElementsStore['bs']['value'],
  id: string
) => {
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
  (id: string) => (elementsStore: ElementsStore['bs']['value']) =>
    elementsStore[id];
