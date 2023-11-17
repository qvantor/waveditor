import { ElementStore } from '../elements';
import { ElementCommon } from '../element';
import { TextStore } from './text';
import { Text } from './text.types';

export const isTextElement = (element: ElementCommon): element is Text =>
  element.type === 'text';
export const isTextStore = (element: ElementStore): element is TextStore =>
  element.bs.value.type === 'text';
