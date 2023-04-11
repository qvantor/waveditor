import { addPx, parseCSSUnitValue } from './css-units';

export type PaddingObj = {
  top: string;
  left: string;
  right: string;
  bottom: string;
};
export const paddingStrToObj = (value: string): PaddingObj => {
  const matches = parseCSSUnitValue(value);
  switch (matches.length) {
    case 1: {
      const [value] = matches[0];
      return { top: value, left: value, right: value, bottom: value };
    }
    case 2: {
      const [[y], [x]] = matches;
      return { top: y, left: x, right: x, bottom: y };
    }
    case 3: {
      const [[top], [x], [bottom]] = matches;
      return { top, left: x, right: x, bottom };
    }
    case 4: {
      const [[top], [right], [bottom], [left]] = matches;
      return { top, left, right, bottom };
    }
    default:
      throw new Error(`${value} is not a padding string`);
  }
};
export const getXPadding = (value = '0px') => {
  const { left, right } = paddingStrToObj(value);
  return Number(left) + Number(right);
};
export const getYPadding = (value = '0px') => {
  const { top, bottom } = paddingStrToObj(value);
  return Number(top) + Number(bottom);
};
export const paddingObjToStr = ({ top, left, right, bottom }: PaddingObj) => {
  if (left === right) {
    if (top === bottom) {
      if (top === left) {
        return addPx(top);
      }
      return `${addPx(top)} ${addPx(left)}`;
    }
    return `${addPx(top)} ${addPx(left)} ${addPx(bottom)}`;
  }
  return `${addPx(top)} ${addPx(right)} ${addPx(bottom)} ${addPx(left)}`;
};
