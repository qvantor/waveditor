import {
  isTipTapVariable,
  mapTipTapParentsContent,
  TipTapVariable,
  TipTapVarLabel,
} from '@waveditors/utils';
import { JSONContent } from '@tiptap/core';
import {
  ElementCommon,
  ElementLinkUrl,
  getElementLinkUrl,
  isTextElement,
  Text,
  TextContent,
} from '../../../elements';
import { Variable, Variables } from '../../../variables';

const applyVariableToTipTapVariable = (
  variable: Variable,
  tipTapVar: TipTapVariable
): TipTapVariable | null => {
  if (variable.label === tipTapVar.attrs.label) return null;
  return TipTapVarLabel.set(variable.label)(tipTapVar);
};

const applyVariablesToJSONContent = (
  variables: Variables,
  content: JSONContent
): JSONContent | null => {
  let changed = false;
  const result = mapTipTapParentsContent(content, (items) =>
    items.reduce<JSONContent[]>((sum, item) => {
      if (!isTipTapVariable(item)) return [...sum, item];
      const variable = variables.find(
        (variable) => variable.id === item.attrs.id
      );

      // no variables mean that var was removed
      if (!variable) {
        changed = true;
        return sum;
      }
      const newItem = applyVariableToTipTapVariable(variable, item);
      if (!newItem) return [...sum, item];

      changed = true;
      return [...sum, newItem];
    }, [])
  );
  return changed ? result : null;
};

const applyVariablesToCommonElement = (
  variables: Variables,
  element: ElementCommon
): ElementCommon | null => {
  const url = getElementLinkUrl(element);
  if (!url || typeof url === 'string') return null;
  const newUrl = applyVariablesToJSONContent(variables, url);
  if (!newUrl) return null;
  return ElementLinkUrl.set(newUrl)(element);
};

const applyVariablesToText = (
  variables: Variables,
  text: Text
): Text | null => {
  const content = applyVariablesToJSONContent(variables, text.params.content);
  if (!content) return null;
  return TextContent.set(content)(text);
};

const applyVariablesByType = (
  variables: Variables,
  element: ElementCommon
): ElementCommon | null => {
  if (isTextElement(element)) return applyVariablesToText(variables, element);
  return null;
};

export const applyVariablesToElement = (
  variables: Variables,
  element: ElementCommon
) => {
  const common = applyVariablesToCommonElement(variables, element);
  const result = applyVariablesByType(variables, common ?? element);
  return result ?? common;
};
