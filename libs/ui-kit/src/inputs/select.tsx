import { SelectProps, Select as AntdSelect } from 'antd';
import { ReactNode, useCallback } from 'react';
import styled from 'styled-components';
import { InputValidation, useValidation } from './input-validation';
import { Root, Label } from './input.styled';

type Props<T> = SelectProps & {
  label?: ReactNode;
  validate?: (value?: T) => string | void;
  onChange?: (value: T) => void;
};

const SelectInternal = styled(AntdSelect)`
  width: 100%;
` as typeof AntdSelect;
export const Select = <T,>({
  validate,
  onChange,
  value,
  label,
  ...selectProps
}: Props<T>) => {
  const {
    validation,
    validateValue,
    onBlur: onBlurValidation,
  } = useValidation<T>(validate);
  const onChangeInternal = useCallback(
    (value: T) => {
      onChange?.(value);
      validateValue(value);
    },
    [onChange, validateValue]
  );
  return (
    <InputValidation validation={validation}>
      <Root>
        {label && <Label>{label}</Label>}
        <SelectInternal
          size='small'
          onBlur={onBlurValidation}
          onChange={onChangeInternal}
          value={value}
          {...selectProps}
        />
      </Root>
    </InputValidation>
  );
};
