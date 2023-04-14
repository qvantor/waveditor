import { useCallback } from 'react';
import {
  getParentElement,
  getTemplateConfigRootElementId,
} from '@waveditors/editor-model';
import { useMailBuilderContext } from '../../hooks';

export const useRemoveSelected = () => {
  const {
    stores: { selected },
  } = useMailBuilderContext();
  const removeElement = useRemoveElement();
  return useCallback(() => {
    const selectedValue = selected.getValue();
    if (!selectedValue) return;
    if (removeElement(selectedValue)) selected.actions.unselect();
  }, [removeElement, selected]);
};
export const useRemoveElement = () => {
  const {
    config,
    stores: { elements, relations },
    modules: { undoRedo },
  } = useMailBuilderContext();
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
