import { filter, map } from 'rxjs';
import { ElementCommon } from '@waveditors/editor-model';
import { useObservable } from '@waveditors/rxjs-react';
import { templateConfigFontToStyle, styleMapper } from '../services';
import { useLayoutEditorContext } from './use-layout-editor-context';

const useFontFamily = (id?: string) => {
  const { config } = useLayoutEditorContext();
  return useObservable(
    config.pipe(
      filter(() => Boolean(id)),
      map(({ fonts }) => {
        const font = fonts.find((font) => font.id === id);
        return font ? { fontFamily: templateConfigFontToStyle(font) } : {};
      })
    ),
    {},
    [id]
  );
};

export const useStyle = (element: ElementCommon) => {
  const fontFamily = useFontFamily(element.fontId);
  return styleMapper({ ...element.style, ...fontFamily });
};
