import { useEffect, useMemo } from 'react';
import { StoreConstructor } from '../types';

//@todo problem here - because of this https://github.com/reactwg/react-18/discussions/18
// example of solution in xstate - https://github.com/statelyai/xstate/blob/main/packages/xstate-react/src/useMachine.ts#L70
// possible memory leak, because store.bs is not cleanup properly on component unmount
// major reason why React.Strict could lead to unexpected behaviour
export const useStore = <V, A, E>(
  storeConstructor: StoreConstructor<V, A, E>,
  initialValue: V,
  deps: unknown[] = []
) => {
  const { bs, actions, getValue, unsubscribe } = useMemo(
    () => storeConstructor.run(initialValue),
    deps
  );
  useEffect(() => {
    return () => unsubscribe();
  }, [unsubscribe]);
  return { bs, actions, getValue };
};
