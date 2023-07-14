import { createStore, StoreResult } from '@waveditors/rxjs-react';
import { indexArray } from 'monocle-ts/lib/Index/Array';

import { Variable, Variables } from './variables.types';

const variableByIndex = (index: number) => indexArray<Variable>().index(index);

export const variablesStoreConstructor = () =>
  createStore<Variables>().addActions({
    addVariable: (variable: Variable, prev) => [...prev, variable],
    setVariable: (
      { variable, index }: { variable: Partial<Variable>; index: number },
      prev
    ) =>
      variableByIndex(index).modify((prevVar) => ({
        ...prevVar,
        ...variable,
      }))(prev),
    removeVariable: (id: string, prev) =>
      prev.filter((variable) => variable.id !== id),
  });

export type VariablesStore = StoreResult<typeof variablesStoreConstructor>;
