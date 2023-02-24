import { MouseEvent, useCallback } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Popover, Input } from 'antd';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { tokens, EmptyPattern } from '@waveditors/theme';
import { ColorRegExp } from '../constants';

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
              if (ColorRegExp.test(value)) onChange(value);
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
