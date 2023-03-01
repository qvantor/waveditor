import {
  ElementCommon,
  selectorToPipe,
  TextStore,
} from '@waveditors/editor-model';
import React from 'react';
import { InputNumberProps } from 'antd';
import { useObservable } from '@waveditors/rxjs-react';
import { addPx, optionalApply, removePx } from '@waveditors/utils';
import { InputNumber } from '../../../common/components';

type Props = {
  text: TextStore;
  selector: (value: ElementCommon) => string | undefined;
  styleKey: 'fontSize' | 'lineHeight' | 'letterSpacing';
  icon?: React.ReactNode;
} & Pick<InputNumberProps<string>, 'min' | 'max' | 'step'>;

export const PxValueEditor = ({
  text,
  selector,
  styleKey,
  icon,
  min = '1',
  max = '500',
  step,
}: Props) => {
  const value = useObservable(
    text.bs.pipe(selectorToPipe(selector)),
    selector(text.getValue()),
    [text]
  );
  const onChange = (value?: string) =>
    text.actions.setStyle({
      key: styleKey,
      value: optionalApply(addPx, value),
    });
  return (
    <InputNumber
      value={optionalApply(removePx, value)}
      onChange={onChange}
      placeholder='auto'
      addonBefore={icon}
      addonAfter='px'
      step={step}
      min={min}
      max={max}
    />
  );
};
