import { ElementStore } from '../elements';
import { LayoutStore } from './layout';

export const isLayoutStore = (element: ElementStore): element is LayoutStore =>
  element.bs.value.type === 'layout';
