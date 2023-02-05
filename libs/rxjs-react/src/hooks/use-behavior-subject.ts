import { BehaviorSubject } from 'rxjs';
import { useObservable } from './use-observable';

export function useBehaviorSubject<T>(behaviorSubject: BehaviorSubject<T>): T;
export function useBehaviorSubject<T, E>(
  behaviorSubject: BehaviorSubject<T>,
  mapper: (value: T) => E
): E;

export function useBehaviorSubject<T, E>(
  behaviorSubject: BehaviorSubject<T>,
  mapper?: (value: T) => E
) {
  return useObservable(behaviorSubject, behaviorSubject.value, mapper);
}
