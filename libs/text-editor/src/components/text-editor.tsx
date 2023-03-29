import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { JSONContent } from '@tiptap/core';
import { deepEqual } from 'fast-equals';
import { Extensions } from '../constants';
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
    extensions: Extensions,
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
    if (!editor || deepEqual(content, editor.getJSON())) return;
    editor.chain().setContent(content, false).run();
  }, [editor, content]);

  // sync outside content value with editor value, when not editable (some kind of blur)
  useEffect(() => {
    if (editable || !editor || deepEqual(content, editor.getJSON())) return;
    onChange(editor.getJSON());
  }, [editable, editor, content, onChange]);

  if (!editor) return null;

  return (
    <>
      <EditorBubbleMenu editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
}
