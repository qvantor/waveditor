import { BehaviorSubject } from 'rxjs';
import { selectorToPipe } from '../services';
import { useObservable } from './use-observable';

export const useBsSelector = <T, V>(
  bs: BehaviorSubject<T>,
  selector: (value: T) => V
) => useObservable(bs.pipe(selectorToPipe(selector)), selector(bs.getValue()));
