import styled from 'styled-components';
import { Collapse } from 'antd';
import { font } from '@waveditors/theme';

export const Root = styled(Collapse)`
  border: none;
  border-radius: 0;
  ${font({ size: 'small' })};
`;

export const CollapseStyled = (props: Parameters<typeof Collapse>[0]) => (
  <Root size='small' {...props} />
);
