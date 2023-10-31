import styled, { css } from 'styled-components';
import { EmptyPattern, tokens } from '@waveditors/theme';
import { AiOutlineClose } from 'react-icons/ai';
import { MouseEvent, useCallback, useEffect, useState } from 'react';
import { useDebounce } from 'react-use';
import { Popover, Tooltip } from 'antd';
import { HexColorPicker } from 'react-colorful';
import { Input } from '@waveditors/ui-kit';
import { colorValidation } from '../../services';

export interface ColorPickerProps {
  value?: string;
  onChange: (value?: string) => void;
  className?: string;
  colors?: string[];
}

const Root = styled.div`
  display: flex;
  justify-content: end;
  height: 22px;
  border: 1px solid ${tokens.color.border.primary};
  border-radius: ${tokens.borderRadius.m};
  overflow: hidden;
  cursor: pointer;
  transition: all 100ms linear;
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
const ColorsContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  width: 190px;
`;

const ColorButton = styled.button<{ selected?: boolean }>`
  width: 30px;
  height: 30px;
  border: 1px solid ${tokens.color.border.primary};
  border-radius: ${tokens.borderRadius.l};
  cursor: pointer;
  outline: 0 solid ${tokens.color.surface.accent};
  transition: all 100ms linear;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: ${tokens.color.border.tertiary};
  }

  ${({ selected }) =>
    selected &&
    css`
      outline: 2px solid ${tokens.color.surface.accent};
    `}
`;

const PopoverInternal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ColorPicker = ({
  value,
  onChange,
  className,
  colors = [],
}: ColorPickerProps) => {
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
      placement='bottom'
      content={
        <PopoverInternal>
          <ColorsContainer>
            {colors.map((color) => (
              <Tooltip title={color} key={color} mouseLeaveDelay={0}>
                <ColorButton
                  onClick={() => onChange(color)}
                  style={{ backgroundColor: color }}
                  selected={value === color}
                />
              </Tooltip>
            ))}
          </ColorsContainer>
          <PopoverInternal>
            <HexColorPicker color={internalValue} onChange={setInternalValue} />
            <Input
              value={internalValue}
              validate={colorValidation}
              onChange={setInternalValue}
            />
          </PopoverInternal>
        </PopoverInternal>
      }
    >
      <Root className={className} style={{ background: value }}>
        {value && <CloseIcon onClick={onCloseClick} />}
      </Root>
    </Popover>
  );
};
