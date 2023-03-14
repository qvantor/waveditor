import styled from 'styled-components';
import { Tooltip } from 'antd';
import { AiFillExclamationCircle } from 'react-icons/ai';
import { tokens } from '@waveditors/theme';
import { TemplateConfigFont } from '@waveditors/editor-model';

const Root = styled.div<{ inherited: boolean }>`
  position: relative;
  display: flex;
  justify-content: space-between;
  padding-right: ${({ inherited }) => (inherited ? '16px' : '0')};
`;
const FontNameText = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const FamilyName = styled.span`
  color: ${tokens.color.text.secondary};
`;
const InheritedIcon = styled(AiFillExclamationCircle)`
  color: ${tokens.color.text.secondary};
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(0, -50%);
`;

interface Props {
  font: TemplateConfigFont;
  inherited: boolean;
}

export const FontName = ({ font, inherited }: Props) => (
  <Root inherited={inherited}>
    <FontNameText>
      {font?.name && font?.url ? `${font.name}, ` : null}
      {font.fallback}, <FamilyName>{font.genericFamily}</FamilyName>
    </FontNameText>
    {inherited && (
      <Tooltip title='Inherited'>
        <InheritedIcon />
      </Tooltip>
    )}
  </Root>
);
