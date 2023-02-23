import { createStore } from '@waveditors/rxjs-react';
import { ElementCommon, ElementStoreDeps } from './element.types';

export const elementStore = <T extends ElementCommon>({
  undoRedo: { createUndoRedoEffect },
}: ElementStoreDeps) =>
  createStore<T>()
    .addActions({
      setStyle: <K extends keyof ElementCommon['style']>(
        { key, value }: { key: K; value: ElementCommon['style'][K] },
        state: T
      ) => ({
        ...state,
        style: {
          ...state.style,
          [key]: value,
        },
      }),
    })
    .addEffect(
      createUndoRedoEffect('element', {
        filter: ({ payload }, value) => payload.next.id === value.id,
      })
    );
// .addEffect(() => ({
//   subscriptions: (config) => [config.bs.subscribe(console.log)],
// }));
