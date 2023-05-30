import { FocusEvent, useCallback, useEffect, useState } from 'react';
import { Input as AntInput, InputProps, Popover } from 'antd';
import styled from 'styled-components';
import { MdError } from 'react-icons/md';
import { font, tokens } from '@waveditors/theme';

type Props = {
  value?: string;
  onChange?: (value?: string) => void;
  validate?: (value?: string) => string | void;
} & Omit<InputProps, 'onChange' | 'value' | 'size'>;

const ErrorContent = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  overflow-wrap: break-word;

  ${font({ size: 'smallest' })}
  svg {
    flex-shrink: 0;
    fill: ${tokens.color.text.danger};
  }
`;
export const Input = ({
  value,
  onChange,
  validate,
  onBlur,
  ...rest
}: Props) => {
  const [internalValue, setInternalValue] = useState(value);
  const [validation, setValidation] = useState<
    { error: false; message?: string } | { error: true; message: string }
  >({
    error: false,
  });

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
      setValidation({ error: false, message: validation.message });
      // one directional update internal -> external
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [internalValue, value, validation, onChange, onBlur]
  );

  useEffect(() => {
    if (validate) {
      const message = validate(internalValue);
      setValidation((error) =>
        message
          ? { error: true, message }
          : { error: false, message: error.message }
      );
    }
  }, [validate, internalValue]);

  return (
    <Popover
      placement='bottom'
      open={validation.error}
      content={
        <ErrorContent>
          <MdError />
          {validation.message ?? null}
        </ErrorContent>
      }
      arrow={false}
      mouseLeaveDelay={0}
      mouseEnterDelay={0}
      color={tokens.color.surface.danger}
      overlayInnerStyle={{ padding: '5px 7px', minWidth: 164, maxWidth: 200 }}
    >
      <AntInput
        size='small'
        value={internalValue}
        onChange={(e) => setInternalValue(e.target.value)}
        onBlur={onBlurInternal}
        status={validation.error ? 'error' : ''}
        {...rest}
      />
    </Popover>
  );
};
