import { JSONContent } from '@tiptap/core';

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
