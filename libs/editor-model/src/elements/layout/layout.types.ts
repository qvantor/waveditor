import { ElementCommon } from '../element/element.types';

export interface Layout extends ElementCommon<'layout'> {
  params: {
    columns: string[][];
  };
}

export interface LayoutAddChild {
  element: string;
  position: {
    layout: string;
    column: number;
    index: number;
    next: boolean;
  };
}
