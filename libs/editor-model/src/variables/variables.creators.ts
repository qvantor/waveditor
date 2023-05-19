import { generateId } from '@waveditors/utils';
import { Variable } from './variables.types';

export const createVariable = (name: string): Variable => ({
  id: generateId(),
  name,
  type: 'string',
  defaultValue: '',
});
