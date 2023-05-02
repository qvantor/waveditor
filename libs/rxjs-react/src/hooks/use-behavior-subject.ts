import { BehaviorSubject } from 'rxjs';
import { useObservable } from './use-observable';

export const useBehaviorSubject = <T>(behaviorSubject: BehaviorSubject<T>) =>
  useObservable(behaviorSubject, behaviorSubject.value, [behaviorSubject]);
