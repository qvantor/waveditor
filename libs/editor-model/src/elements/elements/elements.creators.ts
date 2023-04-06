import { generateId } from '@waveditors/utils';
import { ElementStoreDeps } from '../element';
import { createInitialLayout, layoutStore } from '../layout';
import { textStore, Text } from '../text';
import { imageStore, Image } from '../image';
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
          url: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80',
        },
        style: {
          display: 'block',
          maxWidth: '100%',
        },
      } as Image;
    case 'text':
      return {
        id: generateId(),
        type: 'text',
        params: {
          content: {
            type: 'doc',
            content: [
              {
                type: 'paragraph',
                content: [{ type: 'text', text: 'Empty text' }],
              },
            ],
          },
        },
        style: {},
      } as Text;
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
