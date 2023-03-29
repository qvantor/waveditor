import { JSONContent } from '@tiptap/core';
import { generateHTML } from '@tiptap/html';
import { Extensions } from '../constants';


export const jsonToHtml = (doc: JSONContent) =>
  generateHTML(doc, Extensions);
