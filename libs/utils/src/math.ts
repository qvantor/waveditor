export const round = (value: number, accuracy = 100) =>
  Math.round(value * accuracy) / accuracy;
