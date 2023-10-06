import {
  FocusEvent,
  useCallback,
  useEffect,
  useState,
  forwardRef,
  ReactNode,
} from 'react';
import { Input as AntInput, InputRef, InputProps } from 'antd';
import {
  useValidation,
  useValidateValue,
  InputValidation,
} from './input-validation';
import { Root, Label } from './input.styled';

type Props = {
  value?: string;
  onChange?: (value?: string) => void;
  validate?: (value?: string) => string | void;
  label?: ReactNode;
} & Omit<InputProps, 'onChange' | 'value'>;

export const Input = forwardRef<InputRef, Props>(
  ({ value, onChange, validate, label, onBlur, className, ...rest }, ref) => {
    const [internalValue, setInternalValue] = useState(value);
    const {
      validation,
      onBlur: onBlurValidation,
      validateValue,
    } = useValidation(validate);
    useValidateValue(validateValue, internalValue);

    useEffect(() => {
      if (value !== internalValue) setInternalValue(value);

      // one directional update external -> internal
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    const onBlurInternal = useCallback(
      (e: FocusEvent<HTMLInputElement>) => {
        if (internalValue !== value && !validation.error)
          onChange?.(internalValue);
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
        <Root className={className}>
          {label && <Label>{label}</Label>}
          <AntInput
            size='small'
            value={internalValue}
            onChange={(e) => setInternalValue(e.target.value)}
            onBlur={onBlurInternal}
            status={validation.error ? 'error' : ''}
            ref={ref}
            {...rest}
          />
        </Root>
      </InputValidation>
    );
  }
);
