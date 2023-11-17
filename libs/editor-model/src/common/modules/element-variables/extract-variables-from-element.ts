import { JSONContent } from '@tiptap/core';
import { isTipTapVariable, reduceTipTapContent } from '@waveditors/utils';
import { flow } from 'fp-ts/function';
import {
  ElementCommon,
  getElementLinkUrl,
  getTextContent,
  isTextElement,
} from '../../../elements';

const extractUniqueVarIdsFromJSONContent = (content: JSONContent) =>
  Array.from(
    reduceTipTapContent<Set<string>>(
      content,
      (sum, item) => {
        if (!isTipTapVariable(item)) return sum;
        sum.add(item.attrs.id);
        return sum;
      },
      new Set<string>()
    )
  );

const extractVariablesFromCommonElement = (
  element: ElementCommon
): string[] => {
  const url = getElementLinkUrl(element);
  if (!url || typeof url === 'string') return [];
  return extractUniqueVarIdsFromJSONContent(url);
};

const extractVariablesFromText = flow(
  getTextContent,
  extractUniqueVarIdsFromJSONContent
);

const extractVariablesByType = (element: ElementCommon) => {
  if (isTextElement(element)) return extractVariablesFromText(element);
  return [];
};

export const extractVariablesFromElement = (element: ElementCommon) => [
  ...extractVariablesFromCommonElement(element),
  ...extractVariablesByType(element),
];
