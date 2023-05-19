import {
  createStore,
  StoreHookResult,
  UndoRedoModule,
} from '@waveditors/rxjs-react';
import { indexArray } from 'monocle-ts/lib/Index/Array';
import { UndoRedoEvents } from '../types';
import { Variable, Variables } from './variables.types';

const variableByIndex = (index: number) => indexArray<Variable>().index(index);

type Deps = {
  undoRedo: UndoRedoModule<UndoRedoEvents>;
};

export const variablesStoreConstructor = ({ undoRedo }: Deps) =>
  createStore<Variables>()
    .addActions({
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
    })
    .addEffect(undoRedo.createUndoRedoEffect('VariablesStore'));

export type VariablesStore = StoreHookResult<typeof variablesStoreConstructor>;
