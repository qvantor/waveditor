import { LayoutStore, isLayoutStore, isParentOf } from '../layout';
import { ElementsStore } from './elements';

export const getElementParent = (
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
