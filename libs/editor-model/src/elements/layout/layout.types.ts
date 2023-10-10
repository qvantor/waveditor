import { ElementCommon } from '../element';
import { Style } from '../../types';

export interface Column {
  children: string[];
  proportion: number;
  style?: Style;
}

export interface Layout extends ElementCommon<'layout'> {
  params: {
    columns: Column[];
    gap?: number;
  };
}

export interface Position {
  layout: string;
  column: number;
  index: number;
}

export interface LayoutAddChild {
  element: string;
  position: Position;
}
