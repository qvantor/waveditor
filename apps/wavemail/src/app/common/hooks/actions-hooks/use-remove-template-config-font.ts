import { useCallback } from 'react';
import { getElementsFromElementFontRelationByFontId } from '@waveditors/editor-model';
import { useMailBuilderContext } from '../use-mail-builder-context';

export const useRemoveTemplateConfigFont = () => {
  const {
    config,
    stores: { relations },
  } = useMailBuilderContext();
  return useCallback(
    (fontId: string) => {
      const elementsWithFont = getElementsFromElementFontRelationByFontId(
        fontId
      )(relations.getValue());
      elementsWithFont.forEach(relations.actions.removeElementFontRelation);
      config.actions.removeFont(fontId);
    },
    [config, relations]
  );
};
