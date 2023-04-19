import { ElementCommon } from '../element';
import { Style } from '../../types';

export interface Column {
  children: string[];
  style: Style;
  proportion?: number;
}

export interface Layout extends ElementCommon<'layout'> {
  params: {
    columns: Column[];
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
