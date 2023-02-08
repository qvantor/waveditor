export const notNullish = <T>(value?: T | null): value is T =>
  value !== undefined && value !== null;
