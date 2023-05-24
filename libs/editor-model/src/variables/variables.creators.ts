import { generateId } from '@waveditors/utils';
import { Variable } from './variables.types';

export const createVariable = (label: string): Variable => ({
  id: generateId(),
  label,
  type: 'string',
  defaultValue: '',
});
