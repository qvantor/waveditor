import { useCallback } from 'react';
import {
  getElementsFromElementFontRelationByFontId,
  useBuilderContext,
} from '@waveditors/editor-model';

export const useRemoveTemplateConfigFont = () => {
  const {
    model: { relations, config },
    module: { undoRedo },
  } = useBuilderContext();
  return useCallback(
    (fontId: string) => {
      undoRedo.startBunch();
      const elementsWithFont = getElementsFromElementFontRelationByFontId(
        fontId
      )(relations.getValue());
      elementsWithFont.forEach(relations.actions.removeElementFontRelation);
      config.actions.removeFont(fontId);
      undoRedo.endBunch();
    },
    [config, relations, undoRedo]
  );
};
