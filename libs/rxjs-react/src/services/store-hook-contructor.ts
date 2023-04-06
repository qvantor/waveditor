import { useEffect, useMemo } from 'react';
import { StoreConstructor } from '../types';

export const storeHookConstructor =
  <V, A, E, D>(constructor: (deps: D) => StoreConstructor<V, A, E>) =>
  (initialValue: V, deps: D) => {
    const { bs, actions, getValue, unsubscribe } = useMemo(
      () => constructor(deps).run(initialValue),
      [initialValue, deps]
    );
    useEffect(() => {
      return () => unsubscribe();
    }, [unsubscribe, initialValue, deps]);
    return { bs, actions, getValue };
  };
