import { getConfigRootElementId } from '../../config';
import { BuilderContext } from '../../types';
import { isLayoutStore } from '../layout';
import { getElementById, getParentElement } from './';

const removeByIdInternal = (context: BuilderContext) => (id: string) => {
  const {
    model: { elements, relations },
  } = context;
  const element = getElementById(id)(elements.getValue());
  const parent = getParentElement(elements.getValue(), id);
  if (!parent || !element) return false;

  if (isLayoutStore(element))
    element
      .getValue()
      .params.columns.map((col) => col.children)
      .flat()
      .forEach(removeByIdInternal(context));

  parent.actions.removeChild(id);
  relations.actions.removeElementFontRelation(id);
  elements.actions.removeElement(id);

  return true;
};
export const removeElementById = (context: BuilderContext) => (id: string) => {
  const {
    model: { config },
    module: { undoRedo },
  } = context;
  const rootElementId = getConfigRootElementId(config.getValue());
  if (rootElementId === id) return false;
  undoRedo.startBunch();
  const removed = removeByIdInternal(context)(id);
  undoRedo.endBunch();
  return removed;
};

export const removeSelectedElement = (context: BuilderContext) => () => {
  const { selected } = context.interaction;
  const selectedValue = selected.getValue();
  if (!selectedValue) return false;
  const removeElement = removeElementById(context);
  const removed = removeElement(selectedValue);
  if (removed) selected.actions.unselect();
  return removed;
};
