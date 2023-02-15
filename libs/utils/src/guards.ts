export const notNullish = <T>(value?: T | null): value is T =>
  value !== undefined && value !== null;

export const selectByType =
  <E extends { type: string }, T extends E['type']>(type: T) =>
  (element: E): element is Extract<E, { type: T }> =>
    element.type === type;
