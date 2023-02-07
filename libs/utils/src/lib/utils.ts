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
