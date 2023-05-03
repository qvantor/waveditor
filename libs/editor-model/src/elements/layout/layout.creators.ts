import { generateId } from '@waveditors/utils';
import { Layout, Column } from './layout.types';

export const createInitialLayout = (): Layout => ({
  id: generateId(),
  type: 'layout',
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
