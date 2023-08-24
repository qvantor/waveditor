import { ElementCommon } from '../element';
import { Align } from '../../types';

export interface Column {
  children: string[];
  proportion: number;
  align?: Align;
}

export interface Layout extends ElementCommon<'layout'> {
  params: {
    columns: Column[];
    gap?: number;
  };
}

export interface LayoutAddChild {
  element: string;
  position: {
    layout: string;
    column: number;
    index: number;
  };
}
