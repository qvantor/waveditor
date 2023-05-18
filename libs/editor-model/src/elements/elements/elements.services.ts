import { Element } from './elements.types';
import { ElementsStore } from './elements';

export const elementsStoreToObject = (store: ElementsStore) =>
  Object.entries(store.getValue()).reduce<Record<string, Element>>(
    (sum, [key, store]) => ({ ...sum, [key]: store.getValue() }),
    {}
  );

const isNameExists = (name: string, store: ElementsStore) =>
  Object.values(store.getValue()).some(
    (element) => element.getValue().name === name
  );
export const generateUniqElementName = (
  name: string,
  store: ElementsStore
): string => {
  if (!isNameExists(name, store)) return name;
  const matches = name.match(/(\d+)$/);
  if (!matches) return generateUniqElementName(`${name}1`, store);
  const match = matches[0];
  const newName = `${name.replace(new RegExp(`${match}$`), '')}${
    Number(match) + 1
  }`;
  return generateUniqElementName(newName, store);
};
