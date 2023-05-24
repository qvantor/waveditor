import { generateUniqName } from '../common/services';
import { Variables } from './variables.types';

export const isVariableLabelExist = (variables: Variables) => (label: string) =>
  variables.some((variable) => variable.label === label);
export const generateUniqVariableLabel = (variables: Variables) =>
  generateUniqName('variable', isVariableLabelExist(variables));
