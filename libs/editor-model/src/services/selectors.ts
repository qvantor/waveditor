import { distinctUntilChanged, map, pipe } from 'rxjs';
import { ElementType } from '../elements';

export const selectorToPipe = <T, V>(selector: (value: T) => V) =>
  pipe(map(selector), distinctUntilChanged());

export const elementSelector = <T extends ElementType>(type: T) => ({
  bs: { value: { type } },
});
