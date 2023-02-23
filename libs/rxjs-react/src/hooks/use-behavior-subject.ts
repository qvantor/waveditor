import { BehaviorSubject } from 'rxjs';
import { useObservable } from './use-observable';

export function useBehaviorSubject<T, D extends unknown[]>(
  behaviorSubject: BehaviorSubject<T>,
  deps?: D
) {
  return useObservable(behaviorSubject, behaviorSubject.value, deps);
}
