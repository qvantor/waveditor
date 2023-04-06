import { Unsubscribable } from 'rxjs';
import { useEffect } from 'react';

export const useUnsubscribable = <T extends Unsubscribable>(
  fn: () => T,
  deps: unknown[] = []
) =>
  useEffect(() => {
    const sb = fn();
    return () => {
      sb.unsubscribe();
    };
  }, [...deps]);
