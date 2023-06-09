import styled from 'styled-components';
import { font, tokens } from '@waveditors/theme';
import { AiOutlinePlus } from 'react-icons/ai';
import { Button } from 'antd';
import { useCallback } from 'react';
import { useNavigate, generatePath } from 'react-router-dom';
import { createEmptySnapshot } from '@waveditors/editor-model';
import { useTemplatesQuery } from '../graphql/templates.g';
import { useCreateTemplateMutation } from '../graphql/create-template.g';
import { BUILDER } from '../../common/constants';

const Root = styled.div`
  display: flex;
  min-height: calc(100vh - ${tokens.size.headerHeight});
`;

const Header = styled.div`
  height: ${tokens.size.headerHeight};
  background: ${tokens.color.surface.tertiary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`;

const Sidebar = styled.div`
  width: 250px;
  background: ${tokens.color.surface.primary};
  border-right: 1px solid ${tokens.color.border.primary};
`;
const Content = styled.div`
  flex: 1;
  padding: 0 20px;
`;
const ContentSubheader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    ${font({ type: 'header' })}
  }
`;
const AddButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const TemplatesList = () => {
  const navigate = useNavigate();
  useTemplatesQuery();
  const [create, { loading }] = useCreateTemplateMutation();
  const createNewTemplate = useCallback(async () => {
    const { data } = await create({
      variables: { data: { json: createEmptySnapshot() } },
    });
    if (!data) return;
    navigate(generatePath(BUILDER, { id: String(data.createTemplate.id) }));
  }, [create, navigate]);
  return (
    <>
      <Header />
      <Root>
        <Sidebar />
        <Content>
          <ContentSubheader>
            <h2>Templates</h2>
            <AddButton
              type='primary'
              onClick={createNewTemplate}
              disabled={loading}
              icon={<AiOutlinePlus />}
            >
              Add
            </AddButton>
          </ContentSubheader>
        </Content>
      </Root>
    </>
  );
};
