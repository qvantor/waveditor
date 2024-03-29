import { Document } from '@tiptap/extension-document';
import { Paragraph } from '@tiptap/extension-paragraph';
import { Text } from '@tiptap/extension-text';
import { ListItem } from '@tiptap/extension-list-item';
import { BulletList } from '@tiptap/extension-bullet-list';
import { OrderedList } from '@tiptap/extension-ordered-list';
import { Bold } from '@tiptap/extension-bold';
import { Italic } from '@tiptap/extension-italic';
import { Strike } from '@tiptap/extension-strike';
import { Underline } from '@tiptap/extension-underline';
import { Link } from '@tiptap/extension-link';
import { OneLiner } from '../tip-tap-nodes';

const DefaultConfig = {
  HTMLAttributes: {
    style: 'margin:0;',
  },
};
export const OneLine = [OneLiner, Paragraph.configure(DefaultConfig), Text];
export const EditorExtensions = [
  Document,
  Paragraph.configure(DefaultConfig),
  Text,
  ListItem,
  BulletList.configure(DefaultConfig),
  OrderedList.configure(DefaultConfig),
  Bold,
  Italic,
  Strike,
  Underline,
  Link.configure({
    openOnClick: false,
    HTMLAttributes: { style: 'color:inherit;text-decoration:none;' },
  }),
];
