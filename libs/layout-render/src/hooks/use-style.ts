import { useCallback } from 'react';
import { map, merge } from 'rxjs';
import {
  ElementCommon,
  getElementFontRelationByElementId,
  getTemplateConfigFontById,
  useBuilderContext,
} from '@waveditors/editor-model';
import { useObservable } from '@waveditors/rxjs-react';
import { templateConfigFontToStyle, styleMapper } from '../services';

const useFontFamily = (elementId: string) => {
  const {
    model: { config, relations },
  } = useBuilderContext();
  const getFontFamily = useCallback(() => {
    const fontId = getElementFontRelationByElementId(elementId)(
      relations.getValue()
    );
    if (!fontId) return;
    const font = getTemplateConfigFontById(fontId)(config.getValue());
    if (!font) return;
    return templateConfigFontToStyle(font);
  }, [elementId, relations, config]);

  return useObservable(
    merge(config.bs, relations.bs).pipe(map(getFontFamily)),
    getFontFamily(),
    [config, relations]
  );
};

export const useStyle = (element: ElementCommon) => {
  const fontFamily = useFontFamily(element.id);
  return styleMapper({ fontFamily, ...element.style });
};
