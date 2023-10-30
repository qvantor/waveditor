import { flow, pipe } from 'fp-ts/function';
import { map as mapArray, sort } from 'fp-ts/Array';
import { createStore } from '@waveditors/rxjs-react';
import { debounceTime, map, BehaviorSubject, Subject } from 'rxjs';
import { toArray } from 'fp-ts/Record';
import { Ord } from 'fp-ts/number';
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
  (color: string) => color.toLowerCase(),
  (color) => color.replace('#', ''),
  (color) => (color.length === 3 ? color.concat(color) : color),
  (color) => `#${color}`
);
const extractColors = flow(
  getElementStyle,
  styleToColors,
  mapArray(normalizeColor)
);
export const usedColorsModule = () => {
  const onChangedElement = new Subject();

  const colors = createStore<UsedColors>()
    .addActions({ set: (value: Array<[string, number]>) => value })
    .run([]);

  const subscribe = (elements: ElementsStore) =>
    onChangedElement
      .pipe(
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
        map(
          sort(
            pipe(
              Ord,
              contramap((val: [string, number]) => val[1])
            )
          )
        )
      )
      .subscribe(colors.actions.set).unsubscribe;

  const elementEffect = () => ({
    subscriptions: ({ bs }: { bs: BehaviorSubject<ElementCommon> }) => [
      bs.subscribe(() => onChangedElement.next(null)),
    ],
  });
  return { elementEffect, colors, subscribe };
};

export type UsedColorsModule = ReturnType<typeof usedColorsModule>;
