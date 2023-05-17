type StringVariable = {
  type: 'string';
  name: string;
  defaultValue: string;
  mode: 'markdown' | 'string';
};

export type Variable = StringVariable;
