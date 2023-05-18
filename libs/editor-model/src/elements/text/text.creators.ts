import { generateId } from '@waveditors/utils';
import { Text } from './text.types';

type Params = {
  name?: string;
};
export const createEmptyText = (params?: Params): Text => ({
  id: generateId(),
  type: 'text',
  name: params?.name ?? 'text',
  link: null,
  params: {
    content: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [{ type: 'text', text: 'Empty text' }],
        },
      ],
    },
  },
  style: {},
});
