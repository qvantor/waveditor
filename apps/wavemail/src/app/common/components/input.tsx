import React, { useCallback, useEffect, useState } from 'react';
import { Input as AntInput, InputProps } from 'antd';

type Props = {
  value?: string;
  onChange?: (value?: string) => void;
  validate?: (value?: string) => boolean;
} & Omit<InputProps, 'onChange' | 'value' | 'size'>;
export const Input = ({ value, onChange, validate, ...rest }: Props) => {
  const [valid, setValid] = useState(true);
  const [internalValue, setInternalValue] = useState(value);
  useEffect(() => {
    if (value !== internalValue) setInternalValue(value);
  }, [value]);

  const onBlur = useCallback(() => {
    if (internalValue !== value) onChange?.(internalValue);
  }, [internalValue, value]);

  useEffect(() => {
    if (validate) setValid(validate(internalValue));
  }, [validate, internalValue]);

  return (
    <AntInput
      size='small'
      value={internalValue}
      onChange={(e) => setInternalValue(e.target.value)}
      onBlur={onBlur}
      status={valid ? '' : 'error'}
      {...rest}
    />
  );
};
