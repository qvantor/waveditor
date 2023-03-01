import { Radio, RadioChangeEvent } from 'antd';
import {
  AiOutlineAlignLeft,
  AiOutlineAlignCenter,
  AiOutlineAlignRight,
} from 'react-icons/ai';
import {
  TextStore,
  getElementTextAlign,
  selectorToPipe,
} from '@waveditors/editor-model';
import { useObservable } from '@waveditors/rxjs-react';

interface Props {
  text: TextStore;
}

export const TextAlign = ({ text }: Props) => {
  const align = useObservable(
    text.bs.pipe(selectorToPipe(getElementTextAlign)),
    getElementTextAlign(text.getValue()),
    [text]
  );
  const onChange = ({ target: { value } }: RadioChangeEvent) =>
    text.actions.setStyle({
      key: 'textAlign',
      value,
    });
  return (
    <Radio.Group
      value={align}
      size='small'
      onChange={onChange}
      buttonStyle='solid'
    >
      <Radio.Button value={undefined}>
        <AiOutlineAlignLeft />
      </Radio.Button>
      <Radio.Button value='center'>
        <AiOutlineAlignCenter />
      </Radio.Button>
      <Radio.Button value='right'>
        <AiOutlineAlignRight />
      </Radio.Button>
    </Radio.Group>
  );
};
