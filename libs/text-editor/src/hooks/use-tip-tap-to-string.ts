import {
  getVariableById,
  useBuilderContext,
  VariablesStore,
} from '@waveditors/editor-model';
import {
  isTipTapText,
  isTipTapVariable,
  reduceTipTapContent,
} from '@waveditors/utils';
import { useMemo } from 'react';
import { JSONContent } from '@tiptap/core';

const getVariableDefaultValue = (variables: VariablesStore) => (id: string) => {
  const variable = getVariableById(id)(variables.getValue());
  return variable?.defaultValue ?? '';
};

const withVariables =
  (variables: VariablesStore) => (content: JSONContent | string) => {
    if (typeof content === 'string') return content;
    const getValue = getVariableDefaultValue(variables);
    return reduceTipTapContent(
      content,
      (sum, item) => {
        if (isTipTapText(item)) return sum + item.text;
        if (isTipTapVariable(item)) return sum + getValue(item.attrs.id);
        return sum;
      },
      ''
    );
  };

export const useTipTapToString = () => {
  const {
    model: { variables },
  } = useBuilderContext();
  return useMemo(() => withVariables(variables), [variables]);
};
