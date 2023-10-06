import { Property } from 'csstype';

export type Background = {
  backgroundColor?: Property.BackgroundColor;
  backgroundImage?: Property.BackgroundImage;
  backgroundPosition?: Property.BackgroundPosition;
  backgroundRepeat?: Property.BackgroundRepeat;
  backgroundSize?: Property.BackgroundSize;
  backgroundOrigin?: Property.BackgroundOrigin;
};

export type Align = 'left' | 'right' | 'center';
export type VerticalAlign = 'top' | 'middle' | 'bottom';

export type Style = {
  display?: Property.Display;
  padding?: Property.Padding<string>;
  margin?: Property.Margin<string>;
  maxWidth?: Property.MaxWidth<string>;
  maxHeight?: Property.MaxHeight<string>;
  fontFamily?: string;
  fontSize?: string;
  lineHeight?: string;
  letterSpacing?: string;
  textAlign?: Align;
  verticalAlign?: VerticalAlign;
  color?: Property.Color;
  borderRadius?: string;
  width?: string;
  height?: string;
  overflow?: Property.Overflow;
} & Background;
