import { Node as ProseMirrorNode } from 'prosemirror-model';
import Suggestion, { SuggestionOptions } from '@tiptap/suggestion';
import { PluginKey } from '@tiptap/pm/state';
import { mergeAttributes, Node } from '@tiptap/core';
import { css } from 'styled-components';
import { theme } from '@waveditors/theme';

type VariablesNodeOptions = {
  HTMLAttributes: Record<string, string>;
  renderLabel: (props: {
    options: VariablesNodeOptions;
    node: ProseMirrorNode;
  }) => string;
  suggestion: Omit<SuggestionOptions, 'editor'>;
};

const VariablesPluginKey = new PluginKey('variables');

export const VariablesStyle = css`
  .variable {
    background-color: ${theme.color.surface.accentSecondaryHalf};
    border-radius: ${theme.borderRadius.m};
    padding: 0 4px;
    color: ${theme.color.text.primary};
  }
`;

export const Variables = Node.create<VariablesNodeOptions>({
  name: 'variable',
  group: 'inline',
  inline: true,
  selectable: false,
  atom: true,
  addOptions() {
    return {
      HTMLAttributes: {
        class: 'variable',
      },
      renderLabel({ options, node }) {
        return `${options.suggestion.char}${
          node.attrs.label ?? node.attrs.id
        }}`;
      },
      suggestion: {
        char: '{',
        pluginKey: VariablesPluginKey,
        command: ({ editor, range, props }) => {
          const nodeAfter = editor.view.state.selection.$to.nodeAfter;
          const overrideSpace = nodeAfter?.text?.startsWith(' ');

          if (overrideSpace) {
            range.to += 1;
          }

          editor
            .chain()
            .focus()
            .insertContentAt(range, [
              {
                type: this.name,
                attrs: props,
              },
              {
                type: 'text',
                text: ' ',
              },
            ])
            .run();

          // window.getSelection()?.collapseToEnd();
        },
        allow: ({ state, range }) => {
          const $from = state.doc.resolve(range.from);
          const type = state.schema.nodes[this.name];
          return !!$from.parent.type.contentMatch.matchType(type);
        },
      },
    };
  },
  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-id'),
        renderHTML: (attributes) => {
          if (!attributes.id) {
            return {};
          }

          return {
            'data-id': attributes.id,
          };
        },
      },

      label: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-label'),
        renderHTML: (attributes) => {
          if (!attributes.label) {
            return {};
          }

          return {
            'data-label': attributes.label,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: `span[data-type="${this.name}"]`,
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(
        { 'data-type': this.name },
        this.options.HTMLAttributes,
        HTMLAttributes
      ),
      this.options.renderLabel({
        options: this.options,
        node,
      }),
    ];
  },

  renderText({ node }) {
    return this.options.renderLabel({
      options: this.options,
      node,
    });
  },

  addKeyboardShortcuts() {
    return {
      Backspace: () =>
        this.editor.commands.command(({ tr, state }) => {
          let isVariable = false;
          const { selection } = state;
          const { empty, anchor } = selection;

          if (!empty) {
            return false;
          }

          state.doc.nodesBetween(anchor - 1, anchor, (node, pos) => {
            if (node.type.name === this.name) {
              isVariable = true;
              tr.insertText(
                this.options.suggestion.char || '',
                pos,
                pos + node.nodeSize
              );

              return false;
            }
          });

          return isVariable;
        }),
    };
  },
});
