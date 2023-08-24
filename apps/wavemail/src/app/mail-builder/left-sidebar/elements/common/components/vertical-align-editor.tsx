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

export const VerticalAlignEditor = ({ onChange, value }: Props) => (
  <Segmented
    value={value ?? 'middle'}
    size='small'
    options={[
      { icon: <PiAlignTopSimpleBold />, value: 'top' },
      { icon: <PiAlignCenterVerticalSimpleBold />, value: 'middle' },
      { icon: <PiAlignBottomSimpleBold />, value: 'bottom' },
    ]}
    onChange={(value) =>
      onChange(value === 'middle' ? undefined : (value as VerticalAlign))
    }
    block
  />
);
