import { CommonUndoEvent } from '@waveditors/rxjs-react';

export type VariablesTypes = 'string' | 'number';

type VariableCommon = {
  id: string;
  type: VariablesTypes;
  label: string;
  defaultValue?: string;
  required?: boolean;
};

export type Variable = VariableCommon;

export type Variables = Variable[];

export type VariablesStoreUndoRedoEvent = CommonUndoEvent<
  'VariablesStore',
  Variables
>;
