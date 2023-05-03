import {
  TextStore,
  getElementTextAlign,
  Align,
} from '@waveditors/editor-model';
import { useBsSelector } from '@waveditors/rxjs-react';
import { AlignEditor } from '../../common/components';

interface Props {
  text: TextStore;
}

export const TextAlign = ({ text }: Props) => {
  const align = useBsSelector(text.bs, getElementTextAlign);
  const onChange = (value?: Align) =>
    text.actions.setStyle({ key: 'textAlign', value });
  return <AlignEditor onChange={onChange} value={align} />;
};
