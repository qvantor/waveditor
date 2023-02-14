import { Unsubscribable } from 'rxjs';
import { useEffect, useMemo } from 'react';

export const useUnsubscribable = <T extends Unsubscribable>(fn: () => T) => {
  const result = useMemo(() => fn(), []);
  useEffect(() => {
    return () => result.unsubscribe();
  }, [result]);
  return result;
};
