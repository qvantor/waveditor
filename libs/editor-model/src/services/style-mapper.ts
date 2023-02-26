import * as CSS from 'csstype';
import { ElementCommon } from '../elements';

export const styleMapper = (
  style: Partial<ElementCommon['style']>
): CSS.Properties => {
  const { backgroundImage, ...restStyle } = style;

  return {
    ...restStyle,
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
  };
};
