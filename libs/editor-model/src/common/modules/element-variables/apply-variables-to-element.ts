import {
  isTipTapVariable,
  mapTipTapParentsContent,
  TipTapVariable,
} from '@waveditors/utils';
import { JSONContent } from '@tiptap/core';
import { ElementCommon, Text } from '../../../elements';
import { Variable, Variables } from '../../../variables';

const applyVariableToTipTapVariable = (
  variable: Variable,
  tipTapVar: TipTapVariable
): TipTapVariable | null => {
  if (variable.label === tipTapVar.attrs.label) return null;
  return {
    ...tipTapVar,
    attrs: {
      ...tipTapVar.attrs,
      label: variable.label,
    },
  };
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
  if (!element.link?.url || typeof element.link.url === 'string') return null;
  const newUrl = applyVariablesToJSONContent(variables, element.link.url);
  if (!newUrl) return null;
  return {
    ...element,
    link: {
      ...element.link,
      url: newUrl,
    },
  };
};

const applyVariablesToText = (
  variables: Variables,
  text: Text
): Text | null => {
  const content = applyVariablesToJSONContent(variables, text.params.content);
  if (!content) return null;
  return { ...text, params: { ...text.params, content } };
};

const applyVariablesByType = (
  variables: Variables,
  element: ElementCommon
): ElementCommon | null => {
  switch (element.type) {
    case 'text':
      return applyVariablesToText(variables, element as Text);
    case 'image':
    case 'layout':
      return null;
  }
};

export const applyVariablesToElement = (
  variables: Variables,
  element: ElementCommon
) => {
  const common = applyVariablesToCommonElement(variables, element);
  const result = applyVariablesByType(variables, common ?? element);
  return result ?? common;
};
