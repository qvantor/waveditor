import { useEffect, useMemo } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import { JSONContent } from '@tiptap/core';
import { deepEqual } from 'fast-equals';
import { createGlobalStyle } from 'styled-components';
import { Subject } from 'rxjs';
import { Extensions } from '../constants';
import { useVariablesEditor, VariablesStyle } from '../variables';
import { TextEditorContextProvider, TextEditorEvents } from '../hooks';
import { BubbleMenu } from './bubble-menu';

export interface Props {
  onChange: (value: JSONContent) => void;
  content: JSONContent;
  className?: string;
  editable?: boolean;
  iFrameDocument?: Document;
}

export const TextEditorStyle = createGlobalStyle`
  ${VariablesStyle}
  .ProseMirror {
    position: relative;
  }

  .ProseMirror {
    word-wrap: break-word;
    white-space: pre-wrap;
    white-space: break-spaces;
    -webkit-font-variant-ligatures: none;
    font-variant-ligatures: none;
    font-feature-settings: "liga" 0; /* the above doesn't seem to work in Edge */
  }

  .ProseMirror [contenteditable="false"] {
    white-space: normal;
  }

  .ProseMirror [contenteditable="false"] [contenteditable="true"] {
    white-space: pre-wrap;
  }

  .ProseMirror pre {
    white-space: pre-wrap;
  }

  img.ProseMirror-separator {
    display: inline !important;
    border: none !important;
    margin: 0 !important;
    width: 1px !important;
    height: 1px !important;
  }

  .ProseMirror-gapcursor {
    display: none;
    pointer-events: none;
    position: absolute;
    margin: 0;
  }

  .ProseMirror-gapcursor:after {
    content: "";
    display: block;
    position: absolute;
    top: -2px;
    width: 20px;
    border-top: 1px solid black;
    animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;
  }

  @keyframes ProseMirror-cursor-blink {
    to {
      visibility: hidden;
    }
  }

  .ProseMirror-hideselection *::selection {
    background: transparent;
  }

  .ProseMirror-hideselection *::-moz-selection {
    background: transparent;
  }

  .ProseMirror-hideselection * {
    caret-color: transparent;
  }

  .ProseMirror-focused .ProseMirror-gapcursor {
    display: block;
  }

  .tippy-box[data-animation=fade][data-state=hidden] {
    opacity: 0
  }
`;

export function TextEditor({
  onChange,
  content,
  className,
  editable = false,
  iFrameDocument = document,
}: Props) {
  const variablesEditor = useVariablesEditor({
    body: iFrameDocument.body,
  });
  const editor = useEditor({
    injectCSS: false,
    extensions: [variablesEditor, ...Extensions],
    content,
    editable,
    editorProps: {
      attributes: className ? { class: className } : undefined,
    },
    // sync outside content value with editor value, when not editable
    onBlur: ({ editor }) => {
      if (deepEqual(content, editor.getJSON())) return;
      onChange(editor.getJSON());
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
  const events = useMemo(() => new Subject<TextEditorEvents>(), []);

  if (!editor) return null;

  return (
    <TextEditorContextProvider value={{ editor, events }}>
      <BubbleMenu />
      <EditorContent editor={editor} />
    </TextEditorContextProvider>
  );
}
