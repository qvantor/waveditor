import { StoreResult } from '@waveditors/rxjs-react';
import { JSONContent } from '@tiptap/core';
import { elementStore } from '../element';
import { Text } from './text.types';
import { content as contentLens } from './text.lens';

export const textStore = () =>
  elementStore<Text>().addActions({
    setContent: (content: JSONContent, text: Text) =>
      contentLens.set(content)(text),
  });
export type TextStore = StoreResult<typeof textStore>;
