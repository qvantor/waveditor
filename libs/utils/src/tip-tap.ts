import { JSONContent } from '@tiptap/core';

export interface TipTapVariable extends JSONContent {
  type: 'variable';
  attrs: {
    id: string;
    label: string;
  };
}

export const isTipTapVariable = (
  content: JSONContent
): content is TipTapVariable => content.type === 'variable';

export const mapJSONContent = (
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

export const filterJSONContent = (
  content: JSONContent,
  predicate: (content: JSONContent) => boolean
): JSONContent => {
  if (!content.content) return content;

  return {
    ...content,
    content: filterChildren(content.content, predicate),
  };
};

export const reduceTipTapContent = <T>(
  content: JSONContent,
  fn: (sum: T, item: JSONContent) => T,
  initial: T
): T => {
  const start = fn(initial, content);
  return (
    content.content?.reduce<T>(
      (acc, current) => reduceTipTapContent(current, fn, acc),
      start
    ) ?? start
  );
};
