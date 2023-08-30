import styled from 'styled-components';
import { Popover } from 'antd';
import { EmptyPattern, font, tokens } from '@waveditors/theme';
import { Input } from '@waveditors/ui-kit';
import { imageLinkValidation } from '../services';

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

const Label = styled.p`
  ${font({ size: 'small' })}
  color: ${tokens.color.text.secondary};
`;

export const ImageUrlInput = ({ value, onChange }: Props) => {
  return (
    <Popover
      trigger='click'
      placement='right'
      content={
        <>
          <Label>Image url:</Label>
          <Input
            value={value}
            onChange={onChange}
            validate={imageLinkValidation}
          />
        </>
      }
    >
      <Root style={value ? { backgroundImage: `url(${value})` } : undefined} />
    </Popover>
  );
};
