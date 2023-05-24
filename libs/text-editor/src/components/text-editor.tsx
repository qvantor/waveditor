import {
  useEffect,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
} from 'react';
import { useEditor, EditorContent, ReactRenderer } from '@tiptap/react';
import { JSONContent } from '@tiptap/core';
import { deepEqual } from 'fast-equals';
import tippy, { Instance } from 'tippy.js';
import { SuggestionKeyDownProps, SuggestionProps } from '@tiptap/suggestion';
import styled, { createGlobalStyle, css } from 'styled-components';
import { font, theme } from '@waveditors/theme';
import { Variables as VariablesType, Variable } from '@waveditors/editor-model';
import { Extensions } from '../constants';
import { EditorBubbleMenu } from './editor-bubble-menu';
import { Variables, VariablesStyle } from './tip-tap-variables-node';

export interface Props {
  onChange: (value: JSONContent) => void;
  content: JSONContent;
  className?: string;
  editable?: boolean;
  iFrameDocument?: Document;
  findVariables: (query: string) => VariablesType;
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

const Root = styled.div`
  background: white;
  padding: 5px;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  font-family: ${theme.font.family};
`;

const VariableItem = styled.div<{ selected?: boolean }>`
  padding: 2px 5px;
  border-radius: ${theme.borderRadius.m};
  ${font({ size: 'small' })}
  color: ${theme.color.text.secondary};
  display: flex;
  justify-content: space-between;
  gap: 15px;

  span {
    color: ${theme.color.text.primary};
  }

  &:hover {
    background-color: ${theme.color.surface.primary};
  }

  ${({ selected }) =>
    selected &&
    css`
      background-color: ${theme.color.surface.accentQuarter};
    `}
`;
type VariablesListProps = {
  variables: Variable[];
  command: (value: Variable) => void;
};
type VariablesListRef = {
  onKeyDown: (props: SuggestionKeyDownProps) => boolean;
};
const VariablesList = forwardRef<VariablesListRef, VariablesListProps>(
  ({ variables, command }, ref) => {
    const [selected, setSelected] = useState(0);
    const selectItem = useCallback(
      (index: number) => {
        const variable = variables[index];
        if (variable) command(variable);
      },
      [command, variables]
    );
    useImperativeHandle(
      ref,
      () => ({
        onKeyDown: ({ event }: SuggestionKeyDownProps) => {
          if (event.key === 'ArrowUp') {
            setSelected((selected + variables.length - 1) % variables.length);
            return true;
          }

          if (event.key === 'ArrowDown') {
            setSelected((selected + 1) % variables.length);
            return true;
          }

          if (event.key === 'Enter') {
            selectItem(selected);
            return true;
          }

          return false;
        },
      }),
      [selectItem, selected, variables.length]
    );
    useEffect(() => setSelected(0), [variables.length]);
    return (
      <Root onClick={(e) => e.stopPropagation()}>
        {variables.map((variable, index) => (
          <VariableItem
            onClick={(e) => selectItem(index)}
            selected={index === selected}
            key={variable.label}
          >
            <span>{variable.label}</span> {variable.type}
          </VariableItem>
        ))}
        {variables.length === 0 && (
          <VariableItem>variables not found</VariableItem>
        )}
      </Root>
    );
  }
);

export function TextEditor({
  onChange,
  content,
  className,
  findVariables,
  editable = false,
  iFrameDocument = document,
}: Props) {
  const editor = useEditor({
    injectCSS: false,
    extensions: [
      Variables.configure({
        suggestion: {
          items: ({ query }) => findVariables(query),
          render: () => {
            let popup: Instance;
            let component: ReactRenderer<VariablesListRef, VariablesListProps>;
            return {
              onStart: (props: SuggestionProps<Variable>) => {
                if (!props.clientRect) return;
                component = new ReactRenderer(VariablesList, {
                  props: { variables: props.items, command: props.command },
                  editor: props.editor,
                });

                popup = tippy(iFrameDocument.body, {
                  getReferenceClientRect: () => props.clientRect?.() as DOMRect,
                  appendTo: () => iFrameDocument.body,
                  content: component.element,
                  showOnCreate: true,
                  interactive: true,
                  trigger: 'manual',
                  placement: 'bottom-start',
                  offset: [0, 5],
                  popperOptions: {
                    strategy: 'absolute',
                  },
                });
              },
              onUpdate: (props) => {
                component.updateProps({
                  variables: props.items,
                  command: props.command,
                });
              },
              onKeyDown: (props) => {
                return component.ref?.onKeyDown(props) ?? false;
              },
              onExit() {
                popup.destroy();
                component.destroy();
              },
            };
          },
        },
      }),
      ...Extensions,
    ],
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

  if (!editor) return null;

  return (
    <>
      <EditorBubbleMenu editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
}
