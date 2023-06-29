import dayjs from 'dayjs';
import { useNavigate, generatePath } from 'react-router-dom';
import { Tag } from 'antd';
import { useCallback } from 'react';
import { useTemplatesQuery } from '../graphql/templates.g';
import { Empty, User } from '../../../common/components';
import { BUILDER } from '../../../common/constants';
import {
  ListContainer,
  ListItem,
  ListItemContent,
  ListItemFooter,
  ListItemHeader,
  ListItemName,
} from '../../common';
import { useCurrentUser } from '../../../common/hooks';
import { TemplateActions } from './template-actions';

export const TemplatesList = () => {
  const user = useCurrentUser();
  const { data } = useTemplatesQuery({
    fetchPolicy: 'cache-and-network',
  });
  const navigate = useNavigate();
  const edit = useCallback(
    (templateId: number) => () =>
      navigate(generatePath(BUILDER, { id: String(templateId) })),
    [navigate]
  );
  if (data?.templates.length === 0) return <Empty>No templates</Empty>;
  return (
    <ListContainer>
      {data?.templates.map((template, i) => {
        const lastVersion = template?.versions?.[0];
        const owner = user?.id === template.creator?.id;
        return (
          <ListItem onClick={edit(template.id)} key={i}>
            <ListItemContent>
              <ListItemHeader>
                {owner ? (
                  <Tag color='blue'>Personal</Tag>
                ) : (
                  <Tag color='green'>From group</Tag>
                )}
                <TemplateActions templateId={template.id} />
              </ListItemHeader>
              <ListItemName>{template.name}</ListItemName>
              <ListItemFooter>
                <User user={template.creator} />
                <span>{dayjs(lastVersion?.updatedAt).fromNow()}</span>
              </ListItemFooter>
            </ListItemContent>
          </ListItem>
        );
      })}
    </ListContainer>
  );
};
