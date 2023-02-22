import { useCallback, useMemo } from 'react';
import { BehaviorSubject, distinctUntilChanged, map } from 'rxjs';
import { InputNumber } from 'antd';
import { Element, ElementStore, ElementCommon } from '@waveditors/editor-model';
import { useObservable } from '@waveditors/rxjs-react';

interface Props {
  element: ElementStore;
}

type PaddingObj = { top: string; left: string; right: string; bottom: string };
const paddingStrToObj = (value: string): PaddingObj => {
  const matches = [...value.matchAll(/(-?\d+)/gm)];
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
const paddingObjToStr = ({ top, left, right, bottom }: PaddingObj) => {
  if (left === right) {
    if (top === bottom) {
      if (top === left) {
        return `${top}px`;
      }
      return `${top}px ${left}px`;
    }
    return `${top}px ${left}px ${bottom}px`;
  }
  return `${top}px ${right}px ${bottom}px ${left}px`;
};
const PaddingEditor = ({
  value = '0px',
  onChange,
}: {
  value: ElementCommon['style']['padding'];
  onChange: (value: ElementCommon['style']['padding']) => void;
}) => {
  const paddingObject = useMemo(
    () => paddingStrToObj(value as string),
    [value]
  );
  const onChangeInternal = useCallback(
    (key: keyof PaddingObj) => (value: string | null) => {
      const val = String(value ?? 0);
      onChange(paddingObjToStr({ ...paddingObject, [key]: val }));
    },
    [paddingObject, onChange]
  );
  return (
    <div>
      <InputNumber
        size='small'
        value={paddingObject.top}
        onChange={onChangeInternal('top')}
      />
      <InputNumber
        size='small'
        value={paddingObject.left}
        onChange={onChangeInternal('left')}
      />
      <InputNumber
        size='small'
        value={paddingObject.right}
        onChange={onChangeInternal('right')}
      />
      <InputNumber
        size='small'
        value={paddingObject.bottom}
        onChange={onChangeInternal('bottom')}
      />
    </div>
  );
};
export const StyleEditor = ({ element }: Props) => {
  const style = useObservable(
    (element.bs as BehaviorSubject<Element>).pipe(
      map((value) => value.style),
      distinctUntilChanged()
    ),
    {}
  );
  return (
    <div>
      <PaddingEditor
        value={style.padding}
        onChange={(value) =>
          element.actions.setStyle({ key: 'padding', value })
        }
      />
    </div>
  );
};
