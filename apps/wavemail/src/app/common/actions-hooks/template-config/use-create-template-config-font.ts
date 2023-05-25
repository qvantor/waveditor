import { useCallback } from 'react';
import {
  TemplateConfigFont,
  useBuilderContext,
} from '@waveditors/editor-model';
import { generateId } from '@waveditors/utils';

export const useCreateTemplateConfigFont = () => {
  const {
    model: { relations, config },
    module: { undoRedo },
  } = useBuilderContext();
  return useCallback(
    (font: Omit<TemplateConfigFont, 'id'>, element: string) => {
      const id = generateId();
      undoRedo.startBunch();
      config.actions.addFont({ ...font, id });
      relations.actions.addElementFontRelation({
        font: id,
        element,
      });
      undoRedo.endBunch();
    },
    [config, relations, undoRedo]
  );
};
