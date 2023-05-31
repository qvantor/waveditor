import { ConfigFont, ElementCommon } from '@waveditors/editor-model';
import * as CSS from 'csstype';

export const configFontToStyle = (font: ConfigFont) => {
  let fontString = '';
  if (font?.name && font.url) fontString = `${font?.name},`;
  return `${fontString}${font.fallback},${font.genericFamily}`;
};

export const styleMapper = (
  style: Partial<ElementCommon['style']>
): CSS.Properties => {
  const { backgroundImage, ...restStyle } = style;

  return {
    ...restStyle,
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
  };
};
