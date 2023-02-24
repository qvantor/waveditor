import { Select } from 'antd';

interface Props {
  value?: string;
  onChange: (value?: string) => void;
}

const RepeatOptions = [
  { value: 'no-repeat', label: 'No repeat' },
  {
    value: 'repeat-x',
    label: 'Repeat X',
  },
  {
    value: 'repeat-y',
    label: 'Repeat Y',
  },
  {
    value: 'repeat',
    label: 'Repeat',
  },
  {
    value: 'space',
    label: 'Space',
  },
  {
    value: 'round',
    label: 'Round',
  },
];
export const BackgroundRepeatSelector = ({ value, onChange }: Props) => {
  return (
    <Select
      style={{ width: '100%' }}
      value={value}
      onChange={onChange}
      options={RepeatOptions}
      size='small'
      allowClear
    />
  );
};
