import {
  createEmptyElement,
  ElementType,
  generateUniqElementName,
  useBuilderContext,
} from '@waveditors/editor-model';
import { useCallback } from 'react';

export const useTypeToElement = () => {
  const {
    model: { elements },
  } = useBuilderContext();
  return useCallback(
    (type: ElementType) =>
      createEmptyElement(type, {
        name: generateUniqElementName(type, elements),
      }),
    [elements]
  );
};
