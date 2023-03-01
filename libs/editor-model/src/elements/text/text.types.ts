import { JSONContent } from '@tiptap/core';
import { ElementCommon } from '../element/';

export interface Text extends ElementCommon<'text'> {
  params: {
    content: JSONContent;
  };
}
