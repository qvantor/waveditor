import { getElementsFromElementFontRelationByFontId } from '../relations';
import { BuilderContext } from '../types';
import { TemplateConfigFont } from './template-config.types';
import { createConfigFont } from './template-config.creator';

export const removeConfigFontById =
  ({ model: { relations, config }, module: { undoRedo } }: BuilderContext) =>
  (fontId: string) => {
    undoRedo.startBunch();
    const elementsWithFont = getElementsFromElementFontRelationByFontId(fontId)(
      relations.getValue()
    );
    elementsWithFont.forEach(relations.actions.removeElementFontRelation);
    config.actions.removeFont(fontId);
    undoRedo.endBunch();
  };

export const addConfigFont =
  ({ model: { relations, config }, module: { undoRedo } }: BuilderContext) =>
  (font: Omit<TemplateConfigFont, 'id'>, element: string) => {
    const newFont = createConfigFont(font);
    undoRedo.startBunch();
    config.actions.addFont(newFont);
    relations.actions.addElementFontRelation({
      font: newFont.id,
      element,
    });
    undoRedo.endBunch();
  };
