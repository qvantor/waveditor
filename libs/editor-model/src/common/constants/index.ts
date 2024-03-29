import { ElementType } from '../../elements';

export type Dimensions = 'w' | 'h';

export const ElementsDimensions: Partial<Record<ElementType, Dimensions[]>> = {
  layout: ['h'],
  text: ['w'],
  image: ['w', 'h'],
};

export const typeToDimensions = (type: ElementType) =>
  ElementsDimensions[type] ?? [];

export const SMALLEST_LAYOUT_SIZE = 10;
