import { useCallback, useEffect, useState } from 'react';
import { InputNumber as AntInputNumber, InputNumberProps } from 'antd';

type Props<T extends number | string> = {
  value?: T | null;
  onChange?: (value?: T) => void;
} & Omit<InputNumberProps<T>, 'value' | 'onChange' | 'size'>;

export const InputNumber = <T extends number | string>({
  value,
  onChange,
  ...rest
}: Props<T>) => {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    if (value !== internalValue) setInternalValue(value);
  }, [value]);
  const onBlur = useCallback(() => {
    if (internalValue !== value) onChange?.(internalValue ?? undefined);
  }, [internalValue, value]);

  return (
    <AntInputNumber
      size='small'
      value={internalValue}
      onChange={setInternalValue}
      onBlur={onBlur}
      style={{ width: '100%' }}
      {...rest}
    />
  );
};
