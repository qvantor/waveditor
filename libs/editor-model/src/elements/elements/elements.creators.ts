import { generateId } from '@waveditors/utils';
import { ElementStoreDeps } from '../element';
import { createInitialLayout, layoutStore } from '../layout';
import { textStore } from '../text';
import { imageStore } from '../image';
import { ElementType, Element, ElementStore } from './elements.types';

export function createEmptyElement<T extends ElementType>(
  type: T
): Extract<Element, { type: T }>;

export function createEmptyElement<T extends ElementType>(type: T) {
  switch (type) {
    case 'image':
      return {
        id: generateId(),
        type: 'image',
        params: {
          url: '',
        },
      };
    case 'text':
      return {
        id: generateId(),
        type: 'text',
        params: {
          content: 'Empty text',
        },
      };
    default:
      return createInitialLayout();
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
