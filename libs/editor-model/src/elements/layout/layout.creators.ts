import { generateId } from '@waveditors/utils';
import { Layout } from './layout.types';

export const createInitialLayout = (): Layout => ({
  id: generateId(),
  type: 'layout',
  params: {
    columns: [[]],
  },
});
