import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { MdError } from 'react-icons/md';
import { Popover } from 'antd';
import { font, tokens } from '@waveditors/theme';
import styled from 'styled-components';

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
type Validation =
  | { error: false; message?: string }
  | { error: true; message: string };

export const useValidateValue = <T,>(
  validateValue: (value?: T | null) => void,
  internalValue?: T | null
) =>
  useEffect(() => {
    validateValue(internalValue);
  }, [validateValue, internalValue]);
export const useValidation = <T,>(validate?: (value?: T) => string | void) => {
  const [validation, setValidation] = useState<Validation>({
    error: false,
  });

  const validateValue = useCallback(
    (value?: T | null) => {
      if (validate) {
        const message = validate(value ?? undefined);
        setValidation((error) =>
          message
            ? { error: true, message }
            : { error: false, message: error.message }
        );
        return typeof message !== 'string';
      }
      return true;
    },
    [validate]
  );

  const onBlur = useCallback(() => {
    setValidation((validation) => ({
      error: false,
      message: validation.message,
    }));
  }, []);
  return { onBlur, validation, validateValue };
};

export const InputValidation = ({
  children,
  validation,
}: PropsWithChildren<{ validation: Validation }>) => (
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
    {children}
  </Popover>
);
