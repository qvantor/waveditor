import { useBuilderContext, Variable } from '@waveditors/editor-model';
import tippy, { Instance } from 'tippy.js';
import { ReactRenderer } from '@tiptap/react';
import { SuggestionProps } from '@tiptap/suggestion';
import {
  VariablesList,
  VariablesListProps,
  VariablesListRef,
} from './variables-list';
import { Variables } from './tip-tap-variables-node';

interface Params {
  body?: HTMLElement;
}

const useFindVariables = () => {
  const {
    model: { variables },
  } = useBuilderContext();
  return (query: string) => {
    return variables
      .getValue()
      .filter((variable) =>
        variable.label.toLowerCase().startsWith(query.toLowerCase())
      )
      .slice(0, 5);
  };
};

export const useVariablesEditor = ({ body = document.body }: Params = {}) => {
  const findVariables = useFindVariables();
  return Variables.configure({
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

            popup = tippy(body, {
              getReferenceClientRect: () => props.clientRect?.() as DOMRect,
              appendTo: () => body,
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
  });
};
