import { Segmented } from 'antd';
import {
  AiOutlineAlignCenter,
  AiOutlineAlignLeft,
  AiOutlineAlignRight,
} from 'react-icons/ai';
import { Align } from '@waveditors/editor-model';

interface Props {
  value?: Align;
  onChange: (value?: Align) => void;
}

const EMPTY_VALUE = 0;

export const AlignEditor = ({ value, onChange }: Props) => {
  return (
    <Segmented
      value={value ?? EMPTY_VALUE}
      size='small'
      options={[
        { label: 'A', title: 'Auto', value: EMPTY_VALUE },
        { icon: <AiOutlineAlignLeft />, value: 'left' },
        { icon: <AiOutlineAlignCenter />, value: 'center' },
        { icon: <AiOutlineAlignRight />, value: 'right' },
      ]}
      onChange={(value) =>
        onChange(value === EMPTY_VALUE ? undefined : (value as Align))
      }
      block
    />
  );
};
