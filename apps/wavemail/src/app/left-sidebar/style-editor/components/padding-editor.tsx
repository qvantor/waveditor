import { useCallback, useMemo } from 'react';
import { InputNumber } from 'antd';
import { Property } from 'csstype';
import styled from 'styled-components';
import { tokens } from '@waveditors/theme';
import {
  paddingStrToObj,
  paddingObjToStr,
  PaddingObj,
} from '@waveditors/utils';

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
