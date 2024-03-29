export const addPx = (value: string | number) => `${value}px`;
export const removePx = (value: string) => value.replace('px', '');

export const parseCSSUnitValue = (value: string) => [
  ...value.matchAll(/(\d+\.?\d*)/gm),
];
