import { VerticalAlign } from '@waveditors/editor-model';
import { Segmented } from 'antd';
import {
  PiAlignBottomSimpleBold,
  PiAlignCenterVerticalSimpleBold,
  PiAlignTopSimpleBold,
} from 'react-icons/pi';

interface Props {
  value?: VerticalAlign;
  onChange: (value?: VerticalAlign) => void;
}

const EMPTY_VALUE = 0;
export const VerticalAlignEditor = ({ onChange, value }: Props) => {
  return (
    <Segmented
      value={value ?? EMPTY_VALUE}
      size='small'
      options={[
        { label: 'A', value: EMPTY_VALUE },
        { icon: <PiAlignTopSimpleBold />, value: 'top' },
        { icon: <PiAlignCenterVerticalSimpleBold />, value: 'middle' },
        { icon: <PiAlignBottomSimpleBold />, value: 'bottom' },
      ]}
      onChange={(value) =>
        onChange(value === EMPTY_VALUE ? undefined : (value as VerticalAlign))
      }
      block
    />
  );
};
