import { useCallback } from 'react';
import { getParentElement } from '@waveditors/editor-model';
import { useMailBuilderContext } from '../../hooks';

export const useRemoveSelected = () => {
  const {
    stores: { selected },
  } = useMailBuilderContext();
  const removeElement = useRemoveElement();
  return useCallback(() => {
    const selectedValue = selected.getValue();
    if (selectedValue) removeElement(selectedValue);
    selected.actions.unselect();
  }, [removeElement, selected]);
};
export const useRemoveElement = () => {
  const {
    stores: { elements, relations },
    modules: { undoRedo },
  } = useMailBuilderContext();
  return useCallback(
    (id: string) => {
      undoRedo.startBunch();
      const parent = getParentElement(elements.getValue(), id);
      if (parent) parent.actions.removeChild(id);
      relations.actions.removeElementFontRelation(id);
      elements.actions.removeElement(id);
      undoRedo.endBunch();
    },
    [elements, undoRedo, relations]
  );
};
