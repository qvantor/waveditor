import { ElementCommon, TextStore } from '@waveditors/editor-model';
import React from 'react';
import { InputNumberProps } from 'antd';
import { useBsSelector } from '@waveditors/rxjs-react';
import { addPx, optionalApply, removePx } from '@waveditors/utils';
import { InputNumber } from '../../../../common/components';

type Props = {
  text: TextStore;
  selector: (value: ElementCommon) => string | undefined;
  styleKey: 'fontSize' | 'lineHeight' | 'letterSpacing';
  icon?: React.ReactNode;
} & Pick<InputNumberProps<string>, 'min' | 'max' | 'step'>;

export const PxValue = ({
  text,
  selector,
  styleKey,
  icon,
  min = '1',
  max = '500',
  step,
}: Props) => {
  const value = useBsSelector(text.bs, selector);
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
