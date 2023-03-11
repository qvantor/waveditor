import { Relations } from './relations.types';

export const getElementFontRelations = (relations: Relations) =>
  relations.elementFont;

export const getElementFontRelationByElementId =
  (elementId: string) =>
  (relations: Relations): string | undefined =>
    getElementFontRelations(relations)[elementId];

export const getElementsFromElementFontRelationByFontId =
  (fontId: string) => (relations: Relations) => Object.entries(relations.elementFont).reduce<string[]>(
    (sum, [elementId, font]) => {
      if (font === fontId) return [...sum, elementId];
      return sum;
    },
    []
  );
