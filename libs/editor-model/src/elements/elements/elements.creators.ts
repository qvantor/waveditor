import { StoreConstructor } from '@waveditors/rxjs-react';
import { createInitialLayout, layoutStore } from '../layout';
import { createEmptyText, textStore } from '../text';
import { createEmptyImage, imageStore } from '../image';
import { Element, ElementStore, ElementType } from './elements.types';

export function createEmptyElement<T extends ElementType>(
  type: T,
  params?: { name?: string }
): Extract<Element, { type: T }>;

export function createEmptyElement<T extends ElementType>(
  type: T,
  params?: { name?: string }
) {
  switch (type) {
    case 'image':
      return createEmptyImage(params);
    case 'text':
      return createEmptyText(params);
    default:
      return createInitialLayout(params);
  }
}

export const elementToStoreConstructor = <E extends Element>(
  element: E
): StoreConstructor<any, any, any> => {
  switch (element.type) {
    case 'layout':
      return layoutStore();
    case 'text':
      return textStore();
    case 'image':
      return imageStore();
  }
};

export const elementsToElementsStore = (
  elements: Record<string, Element>,
  toStore: (element: Element) => ElementStore
) =>
  Object.entries(elements).reduce<Record<string, ElementStore>>(
    (sum, [key, element]) => ({
      ...sum,
      [key]: toStore(element),
    }),
    {}
  );
