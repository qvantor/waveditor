import { createGlobalStyle } from 'styled-components';
import { useMemo } from 'react';
import { useVariablesEditor, VariablesStyle } from '../variables';
import { EditorExtensions } from '../constants';
import { BaseEditor, Props as BaseProps } from './base-editor';

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

type Props = Omit<BaseProps, 'extensions' | 'menu'> & {
  iFrameDocument?: Document;
};

export const TextEditor = ({ iFrameDocument, ...rest }: Props) => {
  const variablesEditor = useVariablesEditor({
    body: iFrameDocument?.body,
  });
  const extensions = useMemo(
    () => [variablesEditor, ...EditorExtensions],
    [variablesEditor]
  );
  return <BaseEditor extensions={extensions} {...rest} />;
};
