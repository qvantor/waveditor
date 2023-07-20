import { useCallback } from 'react';
import { map, merge } from 'rxjs';
import {
  ElementCommon,
  getConfigFontById,
  getElementFontRelationByElementId,
  useBuilderContext,
} from '@waveditors/editor-model';
import { useObservable } from '@waveditors/rxjs-react';
import { addPx, removePx } from '@waveditors/utils';
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

export const useStyle = (
  element: ElementCommon,
  maxWidth = Number.MAX_SAFE_INTEGER
) => {
  const fontFamily = useFontFamily(element.id);
  const width = element.style.width
    ? addPx(Math.min(Number(removePx(element.style.width)), maxWidth))
    : undefined;
  return styleMapper({
    fontFamily,
    ...element.style,
    width,
  });
};
