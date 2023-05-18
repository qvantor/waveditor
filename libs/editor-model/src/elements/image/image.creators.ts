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
    url: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80',
  },
  style: {
    display: 'block',
    maxWidth: '100%',
  },
});
