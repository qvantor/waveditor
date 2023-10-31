import { flow } from 'fp-ts/function';
import { map as mapArray, sort } from 'fp-ts/Array';
import { createStore } from '@waveditors/rxjs-react';
import { debounceTime, map, BehaviorSubject, Subject, startWith } from 'rxjs';
import { toArray } from 'fp-ts/Record';
import { Ord } from 'fp-ts/number';
import { toLowerCase, replace } from 'fp-ts/string';
import { contramap } from 'fp-ts/Ord';
import { ElementCommon, ElementsStore, getElementStyle } from '../../elements';
import { Style } from '../../types';

export type UsedColors = Array<[string, number]>;
const styleToColors = (style: Style) => {
  const keys: (keyof Style)[] = ['color', 'backgroundColor'];
  return keys.reduce<string[]>((sum, key) => {
    if (!style[key]) return sum;
    return [...sum, style[key] as string];
  }, []);
};
const normalizeColor = flow(
  toLowerCase,
  replace('#', ''),
  (color) => (color.length === 3 ? color.concat(color) : color),
  (color) => `#${color}`
);
const extractColors = flow(
  getElementStyle,
  styleToColors,
  mapArray(normalizeColor)
);

// returning elementEffect for subscribe on all elements changes
// on element changes call onChangedElement and recalculate used colors
export const usedColorsModule = () => {
  const onChangedElement = new Subject();

  const colors = createStore<UsedColors>()
    .addActions({ set: (value: Array<[string, number]>) => value })
    .run([]);

  const subscribe = (elements: ElementsStore) => {
    const sb = onChangedElement
      .pipe(
        startWith(null),
        debounceTime(500),
        map(elements.getValue),
        map((elements) =>
          Object.values(elements)
            .map((v) => v.getValue())
            .map(extractColors)
            .flat()
            .reduce<Record<string, number>>((sum, color) => {
              const count = sum[color];
              if (count) return { ...sum, [color]: count + 1 };
              return { ...sum, [color]: 1 };
            }, {})
        ),
        map(toArray),
        map(sort(contramap((val: [string, number]) => val[1])(Ord)))
      )
      .subscribe(colors.actions.set);
    return () => sb.unsubscribe();
  };

  const elementEffect = () => ({
    subscriptions: ({ bs }: { bs: BehaviorSubject<ElementCommon> }) => [
      bs.subscribe(() => onChangedElement.next(null)),
    ],
  });
  return { elementEffect, colors, subscribe };
};

export type UsedColorsModule = ReturnType<typeof usedColorsModule>;
