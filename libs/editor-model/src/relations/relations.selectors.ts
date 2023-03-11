import { Relations } from './relations.types';

export const getElementFontRelations = (relations: Relations) =>
  relations.elementFont;

export const getElementFontRelationByElementId =
  (elementId: string) =>
  (relations: Relations): string | undefined =>
    getElementFontRelations(relations)[elementId];
