import { Element } from './elements.types';
import { ElementsStore } from './elements';

export const elementsStoreToObject = (store: ElementsStore) =>
  Object.entries(store.getValue()).reduce<Record<string, Element>>(
    (sum, [key, store]) => ({ ...sum, [key]: store.getValue() }),
    {}
  );
