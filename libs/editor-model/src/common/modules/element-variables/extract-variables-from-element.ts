import { JSONContent } from '@tiptap/core';
import { isTipTapVariable, reduceTipTapContent } from '@waveditors/utils';
import { ElementCommon, getElementLinkUrl, Text } from '../../../elements';

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

const extractVariablesFromText = (text: Text) =>
  extractUniqueVarIdsFromJSONContent(text.params.content);

const extractVariablesByType = (element: ElementCommon) => {
  switch (element.type) {
    case 'text':
      return extractVariablesFromText(element as Text);
    case 'image':
    case 'layout':
      return [];
  }
};

export const extractVariablesFromElement = (element: ElementCommon) => [
  ...extractVariablesFromCommonElement(element),
  ...extractVariablesByType(element),
];
