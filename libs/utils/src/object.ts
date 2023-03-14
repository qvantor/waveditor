export const removeKey = <
  T extends Record<string | number, unknown>,
  K extends string | number
>(
  obj: T,
  key: K
) => {
  const { [key]: removed, ...newObj } = obj;
  return newObj;
};
