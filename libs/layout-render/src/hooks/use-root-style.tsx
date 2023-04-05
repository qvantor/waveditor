import {
  getTemplateDefaultFont,
  Style,
  selectorToPipe,
} from '@waveditors/editor-model';
import { useObservable } from '@waveditors/rxjs-react';
import { templateConfigFontToStyle } from '../services';
import { useRenderContext } from './use-render-context';

export const useRootStyle = (): Style => {
  const { config } = useRenderContext();
  const configValue = config.getValue();
  const defaultFont = useObservable(
    config.pipe(selectorToPipe(getTemplateDefaultFont)),
    getTemplateDefaultFont(config.getValue())
  );
  return {
    fontFamily: templateConfigFontToStyle(defaultFont),
    ...configValue.style,
  };
};
