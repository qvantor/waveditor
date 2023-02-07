import { ElementStore, LayoutStore } from '../types';

export const isLayoutStore = (element: ElementStore): element is LayoutStore =>
  element.value.type === 'layout';
