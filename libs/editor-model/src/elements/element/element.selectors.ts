import { ElementCommon } from './element.types';

export const getElementStyle = (element: ElementCommon) => element.style;
export const getElementFontSize = (element: ElementCommon) =>
  getElementStyle(element).fontSize;
export const getElementLineHeight = (element: ElementCommon) =>
  getElementStyle(element).lineHeight;
export const getElementLetterSpacing = (element: ElementCommon) =>
  getElementStyle(element).letterSpacing;
