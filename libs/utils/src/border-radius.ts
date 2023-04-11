import { addPx, parseCSSUnitValue } from './css-units';

export type BorderRadiusObj = {
  TL: string;
  TR: string;
  BR: string;
  BL: string;
};
export const borderRadiusToObj = (value: string): BorderRadiusObj => {
  const matches = parseCSSUnitValue(value);
  switch (matches.length) {
    case 1: {
      const [value] = matches[0];
      return { TL: value, TR: value, BR: value, BL: value };
    }
    case 4: {
      const [[TL], [TR], [BR], [BL]] = matches;
      return { TL, TR, BR, BL };
    }
    default:
      throw new Error(`${value} is not a border-radius string`);
  }
};

export const borderRadiusObjToStr = ({ TL, TR, BR, BL }: BorderRadiusObj) => {
  if (TL === TR && BR === BL && BR === TR) return addPx(TL);
  return `${addPx(TL)} ${addPx(TR)} ${addPx(BR)} ${addPx(BL)}`;
};
