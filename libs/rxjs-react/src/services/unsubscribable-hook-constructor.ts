import { useEffect, useMemo } from 'react';
import { Unsubscribable } from 'rxjs';

export const unsubscribableHookConstructor =
  <D extends Array<unknown>, T extends Unsubscribable>(
    unsubscribable: (...deps: D) => T
  ) =>
  (...deps: D) => {
    const result = useMemo(() => unsubscribable(...deps), []);
    useEffect(() => {
      return () => result.unsubscribe();
    }, [result]);
    return result;
  };
