import { generateUniqName } from '../common/services';
import { Variables } from './variables.types';

export const isVariableNameExist = (variables: Variables) => (name: string) =>
  variables.some((variable) => variable.name === name);
export const generateUniqVariableName = (variables: Variables) =>
  generateUniqName('variable', isVariableNameExist(variables));
