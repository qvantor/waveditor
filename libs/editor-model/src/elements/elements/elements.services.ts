import { generateUniqName } from '../../common/services';
import { Element } from './elements.types';
import { ElementsStore } from './elements';

export const elementsStoreToObject = (store: ElementsStore) =>
  Object.entries(store.getValue()).reduce<Record<string, Element>>(
    (sum, [key, store]) => ({ ...sum, [key]: store.getValue() }),
    {}
  );

const isNameExists = (store: ElementsStore) => (name: string) =>
  Object.values(store.getValue()).some(
    (element) => element.getValue().name === name
  );
export const generateUniqElementName = (
  name: string,
  store: ElementsStore
): string => generateUniqName(name, isNameExists(store));
