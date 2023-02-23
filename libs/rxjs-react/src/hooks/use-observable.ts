import { useState, useEffect } from 'react';
import { Observable } from 'rxjs';

export function useObservable<T, D extends unknown[]>(
  observable: Observable<T>,
  initialValue: T,
  deps?: D
) {
  const [value, setValue] = useState<T>(initialValue);
  useEffect(() => {
    const subscription = observable.subscribe((value) => setValue(value));
    return () => {
      subscription.unsubscribe();
    };
  }, [setValue, ...(deps ?? [])]);
  return value;
}
