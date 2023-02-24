import { UndoRedoModule } from '@waveditors/rxjs-react';
import { UndoRedoEvents } from '../types';
import { ElementCommon } from '../elements';

type CommonUndoRedoEffectConfig<A> = {
  filterActions?: Array<keyof A>;
};

export const commonUndoRedoEffect = <V extends ElementCommon, A>(
  { createUndoRedoEffect }: UndoRedoModule<UndoRedoEvents>,
  config?: CommonUndoRedoEffectConfig<A>
) =>
  createUndoRedoEffect<V, A, 'element'>('element', {
    filterActions: config?.filterActions,
    filter: ({ payload }, value) => payload.next.id === value.id,
  });
