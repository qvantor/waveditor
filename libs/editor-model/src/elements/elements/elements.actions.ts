import { getConfigRootElementId } from '../../config';
import { BuilderContext } from '../../types';
import { getParentElement } from './';

export const removeElementById =
  ({
    model: { elements, relations, config },
    module: { undoRedo },
  }: BuilderContext) =>
  (id: string) => {
    const rootElementId = getConfigRootElementId(config.getValue());
    if (rootElementId === id) return false;
    undoRedo.startBunch();
    const parent = getParentElement(elements.getValue(), id);
    if (parent) parent.actions.removeChild(id);
    relations.actions.removeElementFontRelation(id);
    elements.actions.removeElement(id);
    undoRedo.endBunch();
    return true;
  };

// @todo critical - remove layout children as well
export const removeSelectedElement = (context: BuilderContext) => () => {
  const { selected } = context.interaction;
  const selectedValue = selected.getValue();
  if (!selectedValue) return false;
  const removeElement = removeElementById(context);
  const removed = removeElement(selectedValue);
  if (removed) selected.actions.unselect();
  return removed;
};
