import { useCallback, useMemo, useState } from 'react';
import { InputNumber } from '@waveditors/ui-kit';
import { Property } from 'csstype';
import styled from 'styled-components';
import {
  addPx,
  PaddingObj,
  paddingObjToStr,
  paddingStrToObj,
} from '@waveditors/utils';
import { RxLink1, RxLinkNone1 } from 'react-icons/rx';
import { IconButton } from '../../../../../common/components';

interface Props {
  value?: Property.Padding<string>;
  onChange: (value: Property.Padding<string>) => void;
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
`;

const Cell = styled.div`
  flex: 1 1 0;
  display: flex;
  max-width: 90px;
`;

const CentralCell = styled(Cell)`
  gap: 5px;
  width: 100%;
  max-width: 100%;
  justify-content: space-between;
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

export const PaddingEditor = ({ value = '0px', onChange }: Props) => {
  const [linked, setLinked] = useState(false);
  const paddingObject = useMemo(() => paddingStrToObj(value), [value]);
  const onChangeInternal = useCallback(
    (key: keyof PaddingObj) => (value?: string) => {
      const val = String(value ?? 0);
      onChange(
        linked ? addPx(val) : paddingObjToStr({ ...paddingObject, [key]: val })
      );
    },
    [paddingObject, onChange, linked]
  );
  return (
    <Root>
      <TopBottom>
        <InputNumber
          value={paddingObject.top}
          onChange={onChangeInternal('top')}
          addonAfter='px'
        />
      </TopBottom>
      <CentralCell>
        <LeftCell>
          <div>
            <InputNumber
              value={paddingObject.left}
              onChange={onChangeInternal('left')}
              addonAfter='px'
            />
          </div>
        </LeftCell>
        <IconButton
          icon={linked ? <RxLink1 /> : <RxLinkNone1 />}
          size='small'
          onClick={() => setLinked(!linked)}
        />
        <RightCell>
          <div>
            <InputNumber
              value={paddingObject.right}
              onChange={onChangeInternal('right')}
              addonAfter='px'
            />
          </div>
        </RightCell>
      </CentralCell>
      <TopBottom>
        <InputNumber
          value={paddingObject.bottom}
          onChange={onChangeInternal('bottom')}
          addonAfter='px'
        />
      </TopBottom>
    </Root>
  );
};
