import { generateId } from '@waveditors/utils';
import { Column, Layout } from './layout.types';

type Params = {
  name?: string;
};

export const createInitialLayout = (params?: Params): Layout => ({
  id: generateId(),
  type: 'layout',
  name: params?.name ?? 'layout',
  params: {
    columns: [createEmptyColumn(100)],
  },
  link: null,
  style: {},
});

export const createEmptyColumn = (proportion = 0): Column => ({
  children: [],
  proportion,
});
