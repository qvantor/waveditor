import { match, P } from 'ts-pattern';

export const returnValue =
  <T>(value: T) =>
  (): T =>
    value;
export const mapValue = <T, R, L = null>(
  value: T | null | undefined,
  right: (value: T) => R,
  left?: L
) =>
  match(value)
    .with(P.nullish, returnValue(left ?? null))
    .otherwise(right);

export const optionalApply = <T, V>(fn: (value: T) => V, value?: T | null) =>
  value ? fn(value) : undefined;

export const tryCatch =
  <R, A extends unknown[] = []>(fn: (...args: A) => R) =>
  (...args: A): [Error, null] | [null, R] => {
    try {
      return [null, fn(...args)];
    } catch (e) {
      return [e as Error, null];
    }
  };
