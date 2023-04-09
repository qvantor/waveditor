import { distinctUntilChanged, map, pipe } from 'rxjs';

export const selectorToPipe = <T, V>(selector: (value: T) => V) =>
  pipe(map(selector), distinctUntilChanged());
