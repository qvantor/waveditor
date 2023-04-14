import { Property } from 'csstype';

export type Background = {
  backgroundColor?: Property.BackgroundColor;
  backgroundImage?: Property.BackgroundImage;
  backgroundPosition?: Property.BackgroundPosition;
  backgroundRepeat?: Property.BackgroundRepeat;
  backgroundSize?: Property.BackgroundSize;
  backgroundOrigin?: Property.BackgroundOrigin;
};

export type Style = {
  display?: Property.Display;
  padding?: Property.Padding<string>;
  margin?: Property.Margin<string>;
  maxWidth?: Property.MaxWidth<string>;
  fontFamily?: string;
  fontSize?: string;
  lineHeight?: string;
  letterSpacing?: string;
  textAlign?: Property.TextAlign;
  color?: Property.Color;
  borderRadius?: string;
} & Background;
