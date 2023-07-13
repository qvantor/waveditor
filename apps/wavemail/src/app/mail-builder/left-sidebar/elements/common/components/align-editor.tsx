import { Radio, RadioChangeEvent } from 'antd';
import {
  AiOutlineAlignCenter,
  AiOutlineAlignLeft,
  AiOutlineAlignRight,
} from 'react-icons/ai';
import { Align } from '@waveditors/editor-model';
import styled from 'styled-components';

interface Props {
  value?: Align;
  onChange: (value?: Align) => void;
}

const RadioButton = styled(Radio.Button)`
  span {
    line-height: 25px;
  }
`;

export const AlignEditor = ({ value, onChange }: Props) => {
  const onChangeInternal = ({ target: { value } }: RadioChangeEvent) =>
    onChange(value);
  return (
    <Radio.Group
      value={value}
      size='small'
      onChange={onChangeInternal}
      buttonStyle='solid'
    >
      <RadioButton value={undefined}>
        <AiOutlineAlignLeft />
      </RadioButton>
      <RadioButton value='center'>
        <AiOutlineAlignCenter />
      </RadioButton>
      <RadioButton value='right'>
        <AiOutlineAlignRight />
      </RadioButton>
    </Radio.Group>
  );
};
