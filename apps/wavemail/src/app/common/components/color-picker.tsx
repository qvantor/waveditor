import { MouseEvent , useCallback } from 'react';
import { HexColorPicker } from 'react-colorful';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { Popover, Input } from 'antd';
import { tokens } from '@waveditors/theme';

interface Props {
  value?: string;
  onChange: (value?: string) => void;
}

const Root = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  height: 22px;
  border: 1px solid ${tokens.color.border.primary};
  border-radius: ${tokens.borderRadius.m};
  overflow: hidden;
  cursor: pointer;

  background-image: repeating-linear-gradient(45deg,
  ${tokens.color.surface.primary} 25%,
  transparent 25%,
  transparent 75%,
  ${tokens.color.surface.primary} 75%,
  ${tokens.color.surface.primary}),
  repeating-linear-gradient(45deg,
  ${tokens.color.surface.primary} 25%,
  ${tokens.color.surface.secondary} 25%,
  ${tokens.color.surface.secondary} 75%,
  ${tokens.color.surface.primary} 75%,
  ${tokens.color.surface.primary});
  background-position: 0 0, 10px 10px;
  background-size: 20px 20px;
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

export const ColorPicker = ({ value, onChange }: Props) => {
  const onCloseClick = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      onChange();
    },
    [onChange]
  );
  return (
    <Popover
      trigger='click'
      placement='right'
      content={
        <PopoverInternal>
          <HexColorPicker color={value} onChange={onChange} />
          <Input
            value={value}
            size='small'
            onChange={({ target: { value } }) => {
              if (/#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value))
                onChange(value);
            }}
          />
        </PopoverInternal>
      }
    >
      <Root style={{ background: value }}>
        {value && <CloseIcon onClick={onCloseClick} />}
      </Root>
    </Popover>
  );
};
