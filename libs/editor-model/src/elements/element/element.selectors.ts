import { ElementCommon } from './element.types';

// style selectors
export const getElementStyle = (element: ElementCommon) => element.style;
export const getElementLink = (element: ElementCommon) => element.link;
export const getElementFontSize = (element: ElementCommon) =>
  getElementStyle(element).fontSize;
export const getElementLineHeight = (element: ElementCommon) =>
  getElementStyle(element).lineHeight;
export const getElementLetterSpacing = (element: ElementCommon) =>
  getElementStyle(element).letterSpacing;

export const getElementTextAlign = (element: ElementCommon) =>
  getElementStyle(element).textAlign;
export const getElementColor = (element: ElementCommon) =>
  getElementStyle(element).color;

export const getElementName = (element: ElementCommon) => element.name;
export const getElementType = (element: ElementCommon) => element.type;
