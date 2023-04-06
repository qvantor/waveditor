import { useRef, useSyncExternalStore } from 'react';
import { Observable } from 'rxjs';

export function useObservable<T>(observable: Observable<T>, initialValue: T) {
  const val = useRef(initialValue);
  const sync = (onStoreChange: () => void) => {
    const subscription = observable.subscribe((newValue) => {
      val.current = newValue;
      onStoreChange();
    });
    return () => subscription.unsubscribe();
  };
  const getValue = () => val.current;
  return useSyncExternalStore(sync, getValue, getValue);
}
