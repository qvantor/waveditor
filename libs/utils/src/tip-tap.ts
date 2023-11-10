import { JSONContent } from '@tiptap/core';

export interface TipTapVariable extends JSONContent {
  type: 'variable';
  attrs: {
    id: string;
    label: string;
  };
}

export interface TipTapText extends JSONContent {
  type: 'text';
  text: string;
}

export const isTipTapVariable = (
  content: JSONContent
): content is TipTapVariable => content.type === 'variable';

export const isTipTapText = (content: JSONContent): content is TipTapText =>
  content.type === 'text';

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

export const mapTipTapParentsContent = (
  content: JSONContent,
  mapper: (item: JSONContent[]) => JSONContent[]
): JSONContent => {
  if (!content.content) return content;
  return {
    ...content,
    content: mapper(content.content).map((value) =>
      mapTipTapParentsContent(value, mapper)
    ),
  };
};
