import { Variables } from './variables.types';

export const getVariableById = (id: string) => (variables: Variables) =>
  variables.find((variable) => variable.id === id);
