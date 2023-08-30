import styled from 'styled-components';
import { useCallback, useMemo, useState } from 'react';
import {
  addPx,
  BorderRadiusObj,
  borderRadiusObjToStr,
  borderRadiusToObj,
} from '@waveditors/utils';
import { RxLink1, RxLinkNone1 } from 'react-icons/rx';
import { InputNumber } from '@waveditors/ui-kit';
import { IconButton } from '../../../../../common/components';

interface Props {
  value?: string;
  onChange: (value: string) => void;
}

const Root = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 5px 35px;
  position: relative;
`;

const LinkButton = styled(IconButton)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

export const BorderRadiusEditor = ({ value = '0px', onChange }: Props) => {
  const [linked, setLinked] = useState(false);
  const brObject = useMemo(() => borderRadiusToObj(value), [value]);
  const onChangeInternal = useCallback(
    (key: keyof BorderRadiusObj) => (value: string | undefined) => {
      const val = String(value ?? 0);
      onChange(
        linked ? addPx(val) : borderRadiusObjToStr({ ...brObject, [key]: val })
      );
    },
    [brObject, onChange, linked]
  );
  return (
    <Root>
      <LinkButton
        icon={linked ? <RxLink1 /> : <RxLinkNone1 />}
        size='small'
        onClick={() => setLinked(!linked)}
      />
      <InputNumber
        value={brObject.TL}
        onChange={onChangeInternal('TL')}
        addonBefore='px'
      />
      <InputNumber
        value={brObject.TR}
        onChange={onChangeInternal('TR')}
        addonAfter='px'
      />
      <InputNumber
        value={brObject.BL}
        onChange={onChangeInternal('BL')}
        addonBefore='px'
      />
      <InputNumber
        value={brObject.BR}
        onChange={onChangeInternal('BR')}
        addonAfter='px'
      />
    </Root>
  );
};
