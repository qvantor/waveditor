import { ElementStore } from '../elements';
import { TextStore } from './text';

export const isTextStore = (element: ElementStore): element is TextStore =>
  element.bs.value.type === 'text';
