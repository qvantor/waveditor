import {
  getConfigStyle,
  getTemplateDefaultFont,
  useBuilderContext,
} from '@waveditors/editor-model';
import { useBsSelector } from '@waveditors/rxjs-react';
import * as CSS from 'csstype';
import { configFontToStyle, styleMapper } from '../services';

export const useRootStyle = (): CSS.Properties => {
  const {
    model: { config },
  } = useBuilderContext();
  const configStyle = useBsSelector(config.bs, getConfigStyle);
  const defaultFont = useBsSelector(config.bs, getTemplateDefaultFont);
  return styleMapper({
    fontFamily: configFontToStyle(defaultFont),
    ...configStyle,
  });
};
