import { JSONContent } from '@tiptap/core';
import { generateHTML } from '@tiptap/html';
import { Extensions } from '../constants';
import { Variables } from '../components/tip-tap-variables-node';

export const jsonToHtml = (doc: JSONContent) =>
  generateHTML(doc, [
    ...Extensions,
    Variables.configure({
      renderLabel: ({ node }) => `Render variable value for ${node.attrs.id}`,
    }),
  ]);
