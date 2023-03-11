import { map, merge } from 'rxjs';
import {
  ElementCommon,
  getElementFontRelationByElementId,
  getTemplateConfigFontById,
} from '@waveditors/editor-model';
import { useObservable } from '@waveditors/rxjs-react';
import { templateConfigFontToStyle, styleMapper } from '../services';
import { useLayoutEditorContext } from './use-layout-editor-context';

const useFontFamily = (elementId: string) => {
  const { config, relations } = useLayoutEditorContext();
  return useObservable(
    merge(config, relations).pipe(
      map(() => {
        const fontId = getElementFontRelationByElementId(elementId)(
          relations.getValue()
        );
        if (!fontId) return;
        return getTemplateConfigFontById(fontId)(config.getValue());
      }),
      map((font) =>
        font ? { fontFamily: templateConfigFontToStyle(font) } : {}
      )
    ),
    {}
  );
};

export const useStyle = (element: ElementCommon) => {
  const fontFamily = useFontFamily(element.id);
  return styleMapper({ ...element.style, ...fontFamily });
};
