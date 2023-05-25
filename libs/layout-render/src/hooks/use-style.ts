import { useCallback } from 'react';
import { map, merge } from 'rxjs';
import {
  ElementCommon,
  getElementFontRelationByElementId,
  getConfigFontById,
  useBuilderContext,
} from '@waveditors/editor-model';
import { useObservable } from '@waveditors/rxjs-react';
import { configFontToStyle, styleMapper } from '../services';

const useFontFamily = (elementId: string) => {
  const {
    model: { config, relations },
  } = useBuilderContext();
  const getFontFamily = useCallback(() => {
    const fontId = getElementFontRelationByElementId(elementId)(
      relations.getValue()
    );
    if (!fontId) return;
    const font = getConfigFontById(fontId)(config.getValue());
    if (!font) return;
    return configFontToStyle(font);
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
