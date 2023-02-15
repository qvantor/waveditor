import { generateId } from '@waveditors/utils';
import { createInitialLayout } from '../layout';
import { ElementType, Element } from './elements.types';

export function createInitialElement<T extends ElementType>(
  type: T
): Extract<Element, { type: T }>;

export function createInitialElement<T extends ElementType>(type: T) {
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

// export function elementToElementStore(element: Element, deps: LayoutStore) {
//   switch (element.type) {
//     case 'layout': {
//       layoutStore();
//     }
//   }
// }
