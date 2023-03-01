import { useEffect } from 'react';
import { Document } from '@tiptap/extension-document';
import { Paragraph } from '@tiptap/extension-paragraph';
import { Text } from '@tiptap/extension-text';
import { ListItem } from '@tiptap/extension-list-item';
import { BulletList } from '@tiptap/extension-bullet-list';
import { OrderedList } from '@tiptap/extension-ordered-list';
import { Bold } from '@tiptap/extension-bold';
import { Italic } from '@tiptap/extension-italic';
import { Strike } from '@tiptap/extension-strike';
import { useEditor, EditorContent, FloatingMenu } from '@tiptap/react';
import { JSONContent } from '@tiptap/core';
import equal from 'fast-deep-equal';
import { EditorBubbleMenu } from './editor-bubble-menu';

export interface Props {
  onChange: (value: JSONContent) => void;
  content: JSONContent;
  className?: string;
  editable?: boolean;
}

export function TextEditor({
  onChange,
  content,
  className,
  editable = false,
}: Props) {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      ListItem,
      BulletList,
      OrderedList,
      Bold,
      Italic,
      Strike,
    ],
    content,
    editable,
    editorProps: {
      attributes: className ? { class: className } : undefined,
    },
  });

  // focus if editable
  useEffect(() => {
    editor?.setEditable(editable);
    if (editable) editor?.chain().focus('end').run();
  }, [editor, editable]);

  // sync editor with outside content value
  useEffect(() => {
    if (!editor || equal(content, editor.getJSON())) return;
    editor.chain().setContent(content, false).run();
  }, [editor, content]);

  // sync outside content value with editor value, when not editable (some kind of blur)
  useEffect(() => {
    if (editable || !editor || equal(content, editor.getJSON())) return;
    onChange(editor.getJSON());
  }, [editable, editor, content, onChange]);

  if (!editor) return null;

  return (
    <>
      <EditorBubbleMenu editor={editor} />
      <FloatingMenu editor={editor}>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          Bullet List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          Ordered list
        </button>
      </FloatingMenu>
      <EditorContent editor={editor} />
    </>
  );
}
