import { Collapse, Select } from 'antd';
import styled from 'styled-components';
import { CollapseStyled, Input } from '../../common/components';
import { RowContainer, SimpleEditorRow } from '../common/components';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Variables = () => {
  return (
    <CollapseStyled name='variables'>
      <Collapse.Panel
        key='user_name'
        header={
          <Header>
            <div>user_name</div>
            <div>string</div>
          </Header>
        }
      >
        <RowContainer>
          <SimpleEditorRow>
            <div>Name</div>
            <Input maxLength={16} showCount />
          </SimpleEditorRow>
          <SimpleEditorRow>
            <div>Type</div>
            <Select size='small' />
          </SimpleEditorRow>
          <SimpleEditorRow>
            <div>Default value</div>
            <Input />
          </SimpleEditorRow>
        </RowContainer>
      </Collapse.Panel>
    </CollapseStyled>
  );
};
