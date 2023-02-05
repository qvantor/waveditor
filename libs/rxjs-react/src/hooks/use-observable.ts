import { useState, useEffect } from 'react';
import { Observable } from 'rxjs';

export function useObservable<T>(observable: Observable<T>, initialValue: T): T;
export function useObservable<T, E>(
  observable: Observable<T>,
  initialValue: T,
  mapper?: (value: T) => E
): E;

export function useObservable<T, E>(
  observable: Observable<T>,
  initialValue: T,
  mapper?: (value: T) => E
) {
  const [value, setValue] = useState<T | E>(initialValue);
  useEffect(() => {
    const subscription = observable.subscribe((value) =>
      setValue(mapper ? mapper(value) : value)
    );
    return () => {
      subscription.unsubscribe();
    };
  }, [observable, setValue, mapper]);
  return value;
}
