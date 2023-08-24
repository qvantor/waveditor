import { FocusEvent, useCallback, useEffect, useState } from 'react';
import { InputNumber as AntInputNumber, InputNumberProps } from 'antd';
import { useValidation, InputValidation } from './input-validation';

type Props<T extends number | string> = {
  value?: T | null;
  onChange?: (value?: T) => void;
  validate?: (value?: T) => string | void;
} & Omit<InputNumberProps<T>, 'value' | 'onChange' | 'size'>;

export const InputNumber = <T extends number | string>({
  value,
  onChange,
  validate,
  onBlur,
  ...rest
}: Props<T>) => {
  const [internalValue, setInternalValue] = useState(value);
  const { validation, onBlur: onBlurValidation } = useValidation(
    internalValue,
    validate
  );

  useEffect(() => {
    if (value !== internalValue) setInternalValue(value);

    // one directional update external -> internal
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  const onBlurInternal = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      if (internalValue !== value && !validation.error)
        onChange?.(internalValue ?? undefined);
      if (validation.error) setInternalValue(value);
      onBlur?.(e);
      onBlurValidation();
      // one directional update internal -> external
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [internalValue, value, validation, onChange, onBlur, onBlurValidation]
  );

  return (
    <InputValidation validation={validation}>
      <AntInputNumber
        size='small'
        value={internalValue}
        onChange={setInternalValue}
        onBlur={onBlurInternal}
        style={{ width: '100%' }}
        {...rest}
      />
    </InputValidation>
  );
};
