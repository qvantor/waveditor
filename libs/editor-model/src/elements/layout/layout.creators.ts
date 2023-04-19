import { generateId } from '@waveditors/utils';
import { Layout, Column } from './layout.types';

export const createInitialLayout = (): Layout => ({
  id: generateId(),
  type: 'layout',
  params: {
    columns: [createEmptyColumn()],
  },
  link: null,
  style: {},
});

export const createEmptyColumn = (): Column => ({
  children: [],
  style: {},
});
