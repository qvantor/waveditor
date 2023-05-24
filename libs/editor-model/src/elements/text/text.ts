import { StoreResult } from '@waveditors/rxjs-react';
import { JSONContent } from '@tiptap/core';
import { deepEqual } from 'fast-equals';
import { elementStore, ElementStoreDeps } from '../element';
import { commonUndoRedoEffect } from '../../services';
import { getVariableById } from '../../variables';
import { Text } from './text.types';

const getTextContent = (text: Text) => text.params.content;

const mapJSONContent = (
  content: JSONContent,
  mapper: (value: JSONContent) => JSONContent
): JSONContent => {
  const root = mapper(content);
  if (content.content) {
    return {
      ...root,
      content: content.content.map((value) => mapJSONContent(value, mapper)),
    };
  }
  return root;
};

const filterChildren = (
  children: JSONContent[],
  predicate: (content: JSONContent) => boolean
): JSONContent[] =>
  children.reduce<JSONContent[]>((sum, content) => {
    if (!predicate(content)) return sum;
    if (!content.content) return [...sum, content];

    return [
      ...sum,
      {
        ...content,
        content: filterChildren(content.content, predicate),
      },
    ];
  }, []);

const filterJSONContent = (
  content: JSONContent,
  predicate: (content: JSONContent) => boolean
): JSONContent => {
  if (!content.content) return content;

  return {
    ...content,
    content: filterChildren(content.content, predicate),
  };
};

const setContent = (content: JSONContent, text: Text) => ({
  ...text,
  params: {
    ...text.params,
    content,
  },
});
export const textStore = (deps: ElementStoreDeps) =>
  elementStore<Text>()
    .addActions({ setContent })
    .addEffect(commonUndoRedoEffect(deps.undoRedo))
    .addEffect(() => ({
      subscriptions: (config) => [
        // subscription for update variables in text nodes
        // @todo refactor is needed
        deps.variables.bs.subscribe((variables) => {
          const content = getTextContent(config.bs.value);
          const mapped = mapJSONContent(content, (value) => {
            if (value.type !== 'variable') return value;
            if (value.attrs?.id) {
              const variable = getVariableById(value.attrs?.id)(variables);
              if (variable)
                return {
                  ...value,
                  attrs: { ...value.attrs, label: variable.label },
                };
              else return null as any;
            }
            return value;
          });
          const filtered = filterJSONContent(mapped, (val) => val !== null);
          if (deepEqual(filtered, content)) return;
          config.bs.next(setContent(filtered, config.bs.value));
        }),
      ],
    }));
export type TextStore = StoreResult<typeof textStore>;
