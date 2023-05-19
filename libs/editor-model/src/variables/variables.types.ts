import { CommonUndoEvent } from '@waveditors/rxjs-react';

export type VariablesTypes = 'string' | 'number';

type VariableCommon = {
  id: string;
  type: VariablesTypes;
  name: string;
  defaultValue: string;
};

export type Variable = VariableCommon;

export type Variables = Variable[];

export type VariablesStoreUndoRedoEvent = CommonUndoEvent<
  'VariablesStore',
  Variables
>;
