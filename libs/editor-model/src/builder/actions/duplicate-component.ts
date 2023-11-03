import { BuilderContext } from '../../types';
import { getElementPosition, getParentElement } from '../../elements';
import { duplicateCloneComponent, extractComponent } from '../../component';
import { mergeComponent } from './merge-component';

export const duplicateComponent = (context: BuilderContext) => () => {
  const {
    model: { elements },
    interaction: { selected },
  } = context;
  const elementId = selected.getValue();
  if (!elementId) return false;
  const parent = getParentElement(elements.getValue(), elementId);
  if (!parent) return false;
  const mergeComp = mergeComponent(context);
  const extractComp = extractComponent(context);
  const element = duplicateCloneComponent(extractComp(elementId));
  const position = getElementPosition(parent.getValue(), elementId);
  mergeComp({ position, element });
  return true;
};
