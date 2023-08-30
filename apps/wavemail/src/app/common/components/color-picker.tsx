import { MouseEvent, useCallback, useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Popover } from 'antd';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { useDebounce } from 'react-use';
import { EmptyPattern, tokens } from '@waveditors/theme';
import { Input } from '@waveditors/ui-kit';
import { colorValidation } from '../services';

interface Props {
  value?: string;
  onChange: (value?: string) => void;
  className?: string;
}

const Root = styled.div`
  display: flex;
  justify-content: end;
  height: 22px;
  border: 1px solid ${tokens.color.border.primary};
  border-radius: ${tokens.borderRadius.m};
  overflow: hidden;
  cursor: pointer;
  ${EmptyPattern};
`;

const CloseIcon = styled(AiOutlineClose)`
  display: none;
  height: 22px;
  padding: 0 8px;
  background: ${tokens.color.surface.secondary};
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease-in;

  &:hover {
    background: ${tokens.color.surface.primary};
  }

  ${Root}:hover & {
    display: block;
  }
`;

const PopoverInternal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ColorPicker = ({ value, onChange, className }: Props) => {
  const [internalValue, setInternalValue] = useState(value);
  const onCloseClick = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      onChange();
    },
    [onChange]
  );
  useDebounce(
    () => {
      if (internalValue !== value) onChange(internalValue);
    },
    400,
    [internalValue]
  );

  useEffect(() => {
    if (value !== internalValue) setInternalValue(value);

    // one directional update external -> internal
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Popover
      trigger='click'
      placement='right'
      content={
        <PopoverInternal>
          <HexColorPicker color={internalValue} onChange={setInternalValue} />
          <Input
            value={internalValue}
            validate={colorValidation}
            onChange={setInternalValue}
          />
        </PopoverInternal>
      }
    >
      <Root className={className} style={{ background: value }}>
        {value && <CloseIcon onClick={onCloseClick} />}
      </Root>
    </Popover>
  );
};
