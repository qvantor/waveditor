import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Popover, Input } from 'antd';
import { EmptyPattern, font, tokens } from '@waveditors/theme';
import { UrlRegExp } from '../constants';

interface Props {
  value?: string;
  onChange: (value?: string) => void;
}

const Root = styled.div`
  height: 22px;
  border: 1px solid ${tokens.color.border.primary};
  border-radius: ${tokens.borderRadius.m};
  cursor: pointer;
  ${EmptyPattern};
`;

const PopoverInternal = styled.div``;
const Label = styled.p`
  ${font({ size: 'small' })}
  color: ${tokens.color.text.secondary};
`;

export const ImagePicker = ({ value, onChange }: Props) => {
  const [isInvalid, setIsInvalid] = useState(false);
  useEffect(() => {
    if (!value) return setIsInvalid(false);
    setIsInvalid(!UrlRegExp.test(value));
  }, [value]);

  return (
    <Popover
      trigger='click'
      placement='right'
      content={
        <PopoverInternal>
          <Label>Image url:</Label>
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            status={isInvalid ? 'error' : ''}
          />
        </PopoverInternal>
      }
    >
      <Root
        style={value ? { backgroundImage: `url(${value})` } : undefined}
      ></Root>
    </Popover>
  );
};
