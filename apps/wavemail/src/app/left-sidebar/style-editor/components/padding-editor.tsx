import { useCallback, useMemo } from 'react';
import { InputNumber } from 'antd';
import { Property } from 'csstype';
import styled from 'styled-components';
import { tokens } from '@waveditors/theme';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  gap: 5px;
`;

const Cell = styled.div`
  flex: 1 1 0;
  display: flex;
`;

const TopBottom = styled(Cell)`
  justify-content: center;
`;

const LeftCell = styled(Cell)`
  align-items: center;
`;

const RightCell = styled(LeftCell)`
  justify-content: end;
`;

const Anchors = styled(Cell)`
  height: 96px;
  border: 1px solid ${tokens.color.border.primary};
  border-radius: ${tokens.borderRadius.m};
  flex-direction: column;
`;

type PaddingObj = { top: string; left: string; right: string; bottom: string };
const paddingStrToObj = (value: string): PaddingObj => {
  const matches = [...value.matchAll(/(\d+\.?\d*)/gm)];
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

export const PaddingEditor = ({
  value = '0px',
  onChange,
}: {
  value?: Property.Padding<string>;
  onChange: (value: Property.Padding<string>) => void;
}) => {
  const paddingObject = useMemo(() => paddingStrToObj(value), [value]);
  const onChangeInternal = useCallback(
    (key: keyof PaddingObj) => (value: string | null) => {
      const val = String(value ?? 0);
      onChange(paddingObjToStr({ ...paddingObject, [key]: val }));
    },
    [paddingObject, onChange]
  );
  return (
    <Root>
      <TopBottom>
        <InputNumber
          size='small'
          value={paddingObject.top}
          onChange={onChangeInternal('top')}
        />
      </TopBottom>
      <Cell>
        <LeftCell>
          <div>
            <InputNumber
              size='small'
              value={paddingObject.left}
              onChange={onChangeInternal('left')}
            />
          </div>
        </LeftCell>
        <Anchors></Anchors>
        <RightCell>
          <div>
            <InputNumber
              size='small'
              value={paddingObject.right}
              onChange={onChangeInternal('right')}
            />
          </div>
        </RightCell>
      </Cell>
      <TopBottom>
        <InputNumber
          size='small'
          value={paddingObject.bottom}
          onChange={onChangeInternal('bottom')}
        />
      </TopBottom>
    </Root>
  );
};
