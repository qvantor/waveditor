import { useCallback } from 'react';
import { getElementsFromElementFontRelationByFontId } from '@waveditors/editor-model';
import { useMailBuilderContext } from '../../hooks';

export const useRemoveTemplateConfigFont = () => {
  const {
    config,
    stores: { relations },
    modules: { undoRedo },
  } = useMailBuilderContext();
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
