import { useCallback } from 'react';
import {
  getParentElement,
  getTemplateConfigRootElementId,
  useBuilderContext,
} from '@waveditors/editor-model';

export const useRemoveSelected = () => {
  const {
    interaction: { selected },
  } = useBuilderContext();
  const removeElement = useRemoveElement();
  return useCallback(() => {
    const selectedValue = selected.getValue();
    if (!selectedValue) return;
    if (removeElement(selectedValue)) selected.actions.unselect();
  }, [removeElement, selected]);
};
export const useRemoveElement = () => {
  const {
    model: { elements, relations, config },
    module: { undoRedo },
  } = useBuilderContext();
  return useCallback(
    (id: string) => {
      const rootElementId = getTemplateConfigRootElementId(config.getValue());
      if (rootElementId === id) return false;
      undoRedo.startBunch();
      const parent = getParentElement(elements.getValue(), id);
      if (parent) parent.actions.removeChild(id);
      relations.actions.removeElementFontRelation(id);
      elements.actions.removeElement(id);
      undoRedo.endBunch();
      return true;
    },
    [elements, undoRedo, relations, config]
  );
};
