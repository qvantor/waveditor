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

export const AlignEditor = ({ value, onChange }: Props) => {
  return (
    <Segmented
      value={value ?? 'left'}
      size='small'
      options={[
        { icon: <AiOutlineAlignLeft />, value: 'left' },
        { icon: <AiOutlineAlignCenter />, value: 'center' },
        { icon: <AiOutlineAlignRight />, value: 'right' },
      ]}
      onChange={(value) =>
        onChange(value === 'left' ? undefined : (value as Align))
      }
      block
    />
  );
};
