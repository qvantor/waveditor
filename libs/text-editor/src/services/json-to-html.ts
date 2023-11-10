import { JSONContent } from '@tiptap/core';
import { generateHTML } from '@tiptap/html';
import {
  getVariableById,
  Variables as VariablesType,
} from '@waveditors/editor-model';
import { EditorExtensions } from '../constants';
import { Variables } from '../variables';

export const jsonToHtml = (doc: JSONContent, variables: VariablesType) =>
  generateHTML(doc, [
    Variables.configure({
      renderLabel: ({ node }) => {
        const variable = getVariableById(node.attrs.id)(variables);
        return variable?.defaultValue ?? '';
      },
    }),
    ...EditorExtensions,
  ]);
