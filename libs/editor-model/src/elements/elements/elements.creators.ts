import { ElementStoreDeps } from '../element';
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

export function elementToElementStore<E extends Element, T = E['type']>(
  element: E,
  deps: ElementStoreDeps
): Extract<ElementStore, { bs: { value: { type: T } } }>;

export function elementToElementStore<E extends Element>(
  element: E,
  deps: ElementStoreDeps
) {
  switch (element.type) {
    case 'layout':
      return layoutStore(deps).run(element);
    case 'text':
      return textStore(deps).run(element);
    case 'image':
      return imageStore(deps).run(element);
  }
}

export const elementsToElementsStore = (
  elements: Record<string, Element>,
  deps: ElementStoreDeps
) =>
  Object.entries(elements).reduce<Record<string, ElementStore>>(
    (sum, [key, element]) => ({
      ...sum,
      [key]: elementToElementStore(element, deps),
    }),
    {}
  );
