import { useCallback, useEffect, useState, FocusEvent } from 'react';
import { Input as AntInput, InputProps } from 'antd';

type Props = {
  value?: string;
  onChange?: (value?: string) => void;
  validate?: (value?: string) => boolean;
} & Omit<InputProps, 'onChange' | 'value' | 'size'>;
export const Input = ({
  value,
  onChange,
  validate,
  onBlur,
  ...rest
}: Props) => {
  const [valid, setValid] = useState(true);
  const [internalValue, setInternalValue] = useState(value);
  useEffect(() => {
    if (value !== internalValue) setInternalValue(value);

    // one directional update external -> internal
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const onBlurInternal = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      if (internalValue !== value) onChange?.(internalValue);
      onBlur?.(e);
      // one directional update internal -> external
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [internalValue, value, onBlur, onChange]
  );

  useEffect(() => {
    if (validate) setValid(validate(internalValue));
  }, [validate, internalValue]);

  return (
    <AntInput
      size='small'
      value={internalValue}
      onChange={(e) => setInternalValue(e.target.value)}
      onBlur={onBlurInternal}
      status={valid ? '' : 'error'}
      {...rest}
    />
  );
};
