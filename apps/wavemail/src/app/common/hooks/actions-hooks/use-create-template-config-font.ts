import { useCallback } from 'react';
import { TemplateConfigFont } from '@waveditors/editor-model';
import { generateId } from '@waveditors/utils';
import { useMailBuilderContext } from '../use-mail-builder-context';

export const useCreateTemplateConfigFont = () => {
  const {
    config,
    stores: { relations },
    modules: { undoRedo },
  } = useMailBuilderContext();
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
