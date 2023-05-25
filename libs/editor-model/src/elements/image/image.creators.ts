import { generateId } from '@waveditors/utils';
import { Image } from './image.types';

type Params = {
  name?: string;
};

export const createEmptyImage = (params?: Params): Image => ({
  id: generateId(),
  type: 'image',
  name: params?.name ?? 'image',
  link: null,
  params: {
    url: 'https://temp.im/200x200',
  },
  style: {
    display: 'block',
    maxWidth: '100%',
  },
});
