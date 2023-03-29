import { useCallback } from 'react';
import { map, merge } from 'rxjs';
import {
  ElementCommon,
  getElementFontRelationByElementId,
  getTemplateConfigFontById,
} from '@waveditors/editor-model';
import { useObservable } from '@waveditors/rxjs-react';
import { templateConfigFontToStyle, styleMapper } from '../services';
import { useModelContext } from './use-layout-editor-context';

const useFontFamily = (elementId: string) => {
  const { config, relations } = useModelContext();
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
    merge(config, relations).pipe(map(getFontFamily)),
    getFontFamily()
  );
};

export const useStyle = (element: ElementCommon) => {
  const fontFamily = useFontFamily(element.id);
  return styleMapper({ fontFamily, ...element.style });
};
