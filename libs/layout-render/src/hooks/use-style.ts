import { useCallback } from 'react';
import { map, merge } from 'rxjs';
import {
  ElementCommon,
  ElementType,
  getConfigFontById,
  getElementFontRelationByElementId,
  useBuilderContext,
} from '@waveditors/editor-model';
import { useObservable } from '@waveditors/rxjs-react';
import { addPx, getXPadding, removePx } from '@waveditors/utils';
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

const elementStyle = (type: ElementType): Partial<ElementCommon['style']> => {
  switch (type) {
    case 'image':
      return {
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
      };
    default:
      return {};
  }
};
export const useStyle = (
  element: ElementCommon,
  maxWidth = Number.MAX_SAFE_INTEGER
) => {
  const fontFamily = useFontFamily(element.id);
  const paddingX = getXPadding(element.style.padding);
  const width = element.style.width
    ? addPx(
        Math.min(Number(removePx(element.style.width)), maxWidth - paddingX)
      )
    : undefined;
  const style = elementStyle(element.type);
  return styleMapper({
    ...style,
    fontFamily,
    ...element.style,
    width,
  });
};
