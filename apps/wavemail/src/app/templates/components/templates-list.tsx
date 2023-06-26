import styled from 'styled-components';
import { font, theme, tokens } from '@waveditors/theme';
import dayjs from 'dayjs';
import { useNavigate, generatePath } from 'react-router-dom';
import { Spin, Tag } from 'antd';
import { useCallback } from 'react';
import { useTemplatesQuery } from '../graphql/templates.g';
import { User } from '../../common/components';
import { BUILDER } from '../../common/constants';
import { TemplateActions } from './template-actions';

const Root = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  @media only screen and (min-width: ${theme.breakpoint.s}) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media only screen and (min-width: ${theme.breakpoint.l}) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media only screen and (min-width: ${theme.breakpoint.xl}) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const Template = styled.div`
  position: relative;
  border-radius: ${tokens.borderRadius.xl};
  overflow: hidden;
  cursor: pointer;
  background: ${tokens.color.surface.secondary};
  transition: box-shadow 0.3s ease-in-out;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);

  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const Header = styled.div`
  padding: 15px 10px 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    fill: ${tokens.color.text.primary};
  }
`;

const TemplateContent = styled.div`
  display: flex;
  flex-direction: column;
  ${font({ type: 'paragraph', size: 'small' })}
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid ${tokens.color.border.primary};
  padding: 15px;

  span {
    ${font({ type: 'paragraph', size: 'smallest' })}
    color: ${tokens.color.text.secondary}
  }
`;

const Name = styled.div`
  ${font({ type: 'paragraph', size: 'medium', weight: 'bold' })}
  padding: 15px;
`;
export const TemplatesList = () => {
  const { data, loading } = useTemplatesQuery({
    fetchPolicy: 'cache-and-network',
  });
  const navigate = useNavigate();
  const edit = useCallback(
    (templateId: number) => () =>
      navigate(generatePath(BUILDER, { id: String(templateId) })),
    [navigate]
  );
  return (
    <Root>
      {loading && <Spin />}
      {data?.templates.map((template, i) => {
        const lastVersion = template?.versions?.[0];
        return (
          <Template onClick={edit(template.id)} key={i}>
            <TemplateContent>
              <Header>
                <Tag color='blue'>Personal</Tag>
                <TemplateActions templateId={template.id} />
              </Header>
              <Name>{template.name}</Name>
              <Bottom>
                <User user={template.creator} />
                <span>{dayjs(lastVersion?.updatedAt).fromNow()}</span>
              </Bottom>
            </TemplateContent>
          </Template>
        );
      })}
    </Root>
  );
};
