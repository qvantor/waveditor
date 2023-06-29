import styled from 'styled-components';
import { font } from '@waveditors/theme';
import { Button } from 'antd';

export const ContentSubheader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    ${font({ type: 'header' })}
  }
`;

export const AddButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 10px;
`;
