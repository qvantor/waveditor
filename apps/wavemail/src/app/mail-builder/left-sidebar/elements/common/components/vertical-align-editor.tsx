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

export const VerticalAlignEditor = ({ onChange, value }: Props) => {
  return (
    <Segmented
      value={value ?? 0}
      size='small'
      options={[
        { label: 'A', value: 0 },
        { icon: <PiAlignTopSimpleBold />, value: 'top' },
        { icon: <PiAlignCenterVerticalSimpleBold />, value: 'middle' },
        { icon: <PiAlignBottomSimpleBold />, value: 'bottom' },
      ]}
      onChange={(value) =>
        onChange(value === 0 ? undefined : (value as VerticalAlign))
      }
      block
    />
  );
};
