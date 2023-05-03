import { useEffect, useMemo } from 'react';
import { StoreConstructor } from '../types';

export const storeHookConstructor =
  <V, A, E, P = void>(constructor: (params: P) => StoreConstructor<V, A, E>) =>
  (initialValue: V, params: P, deps: unknown[] = []) => {
    const { bs, actions, getValue, unsubscribe } = useMemo(
      () => constructor(params).run(initialValue),
      deps
    );
    useEffect(() => {
      return () => unsubscribe();
    }, [unsubscribe]);
    return { bs, actions, getValue };
  };
