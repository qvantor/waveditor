import {
  getTemplateDefaultFont,
  Style,
  useBuilderContext,
} from '@waveditors/editor-model';
import { useBsSelector } from '@waveditors/rxjs-react';
import { templateConfigFontToStyle } from '../services';

export const useRootStyle = (): Style => {
  const {
    model: { config },
  } = useBuilderContext();
  const configValue = config.getValue();
  const defaultFont = useBsSelector(config.bs, getTemplateDefaultFont);
  return {
    fontFamily: templateConfigFontToStyle(defaultFont),
    ...configValue.style,
  };
};
