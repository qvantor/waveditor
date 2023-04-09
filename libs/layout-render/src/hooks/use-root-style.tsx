import { getTemplateDefaultFont, Style } from '@waveditors/editor-model';
import { useBsSelector } from '@waveditors/rxjs-react';
import { templateConfigFontToStyle } from '../services';
import { useRenderContext } from './use-render-context';

export const useRootStyle = (): Style => {
  const { config } = useRenderContext();
  const configValue = config.getValue();
  const defaultFont = useBsSelector(config, getTemplateDefaultFont);
  return {
    fontFamily: templateConfigFontToStyle(defaultFont),
    ...configValue.style,
  };
};
