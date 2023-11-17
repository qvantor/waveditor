import { useEffect, useMemo } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import { JSONContent, Extensions as ExtensionsType } from '@tiptap/core';
import { deepEqual } from 'fast-equals';

import { Subject } from 'rxjs';
import { TextEditorContextProvider, TextEditorEvents } from '../hooks';
import { BubbleMenu } from './bubble-menu';

export interface Props {
  onChange: (value: JSONContent) => void;
  content: JSONContent;
  className?: string;
  editable?: boolean;
  extensions: ExtensionsType;
  menu?: boolean;
  autoFocus?: boolean;
}

export function BaseEditor({
  onChange,
  content,
  className,
  editable = false,
  menu = true,
  autoFocus = true,
  extensions,
}: Props) {
  const editor = useEditor({
    injectCSS: false,
    extensions,
    content,
    editable,
    editorProps: {
      attributes: className ? { class: className } : undefined,
    },
    // sync outside content value with editor value, when not editable
    onBlur: ({ editor }) => {
      // editor.getJSON return some object without prototype (from ProseMirror model)
      // https://github.com/ProseMirror/prosemirror/issues/761#issuecomment-362794646
      const editorJson = window.structuredClone(editor.getJSON());
      if (deepEqual(content, editorJson)) return;
      onChange(editorJson);
    },
  });

  // focus if editable
  useEffect(() => {
    editor?.setEditable(editable);
    if (editable && autoFocus) editor?.chain().focus('end').run();
  }, [editor, editable, autoFocus]);

  // sync editor with outside content value
  useEffect(() => {
    if (!editor || deepEqual(content, editor.getJSON())) return;
    editor.chain().setContent(content, false).run();
  }, [editor, content]);
  const events = useMemo(() => new Subject<TextEditorEvents>(), []);

  if (!editor) return null;

  return (
    <TextEditorContextProvider value={{ editor, events }}>
      {menu && <BubbleMenu />}
      <EditorContent editor={editor} />
    </TextEditorContextProvider>
  );
}
