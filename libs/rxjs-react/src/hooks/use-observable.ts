import { useCallback, useRef, useSyncExternalStore } from 'react';
import { Observable } from 'rxjs';

export function useObservable<T>(
  observable: Observable<T>,
  initialValue: T,
  deps: unknown[] = []
) {
  const val = useRef(initialValue);

  const sync = useCallback((onStoreChange: () => void) => {
    const subscription = observable.subscribe((newValue) => {
      val.current = newValue;
      onStoreChange();
    });
    return () => subscription.unsubscribe();
  }, deps);
  const getValue = useCallback(() => val.current, []);
  return useSyncExternalStore(sync, getValue, getValue);
}
