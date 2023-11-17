import { StoreResult } from '@waveditors/rxjs-react';
import { JSONContent } from '@tiptap/core';
import { elementStore } from '../element';
import { Text } from './text.types';
import { TextContent } from './text.lens';

export const textStore = () =>
  elementStore<Text>().addActions({
    setContent: (content: JSONContent, text: Text) =>
      TextContent.set(content)(text),
  });
export type TextStore = StoreResult<typeof textStore>;
