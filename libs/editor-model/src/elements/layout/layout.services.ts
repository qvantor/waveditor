import { round } from '@waveditors/utils';
import { Column } from './layout.types';

export const columnsCountToProportion = (count: number) => round(100 / count);

export const recalcProportions = (columns: Column[]) => {
  const proportion = columnsCountToProportion(columns.length);
  return columns.map((column) => ({ ...column, proportion }));
};
