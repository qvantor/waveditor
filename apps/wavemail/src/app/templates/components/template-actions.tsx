import { BsThreeDotsVertical } from 'react-icons/bs';
import { Popover } from 'antd';
import styled from 'styled-components';
import { font, tokens } from '@waveditors/theme';
import { useCallback, useState } from 'react';
import { IconButton } from '../../common/components';
import { useDeleteTemplateMutation } from '../graphql/delete-template.g';
import { client } from '../../common/services';
import { TemplatesDocument, TemplatesQuery } from '../graphql/templates.g';

const List = styled.div`
  margin: -6px -12px;
  min-width: 100px;
  ${font({ size: 'small' })}
`;
const ListItem = styled.div`
  padding: 4px 8px;
  cursor: pointer;

  &:hover {
    background: ${tokens.color.surface.primary};
  }
`;
const DeleteItem = styled(ListItem)`
  color: ${tokens.color.text.danger};
`;

interface Props {
  templateId: number;
}

export const TemplateActions = ({ templateId }: Props) => {
  const [open, setOpen] = useState(false);
  const [mutate] = useDeleteTemplateMutation();
  const deleteTemplate = useCallback(() => {
    mutate({ variables: { templateId } });
    client.cache.updateQuery(
      { query: TemplatesDocument },
      (data: TemplatesQuery | null) => {
        if (!data) return data;
        return {
          templates: data.templates.filter(
            (template) => template.id !== templateId
          ),
        };
      }
    );
  }, [mutate, templateId]);
  return (
    <Popover
      content={
        <List
          onClick={(e) => {
            e.stopPropagation();
            setOpen(false);
          }}
        >
          <DeleteItem onClick={deleteTemplate}>Delete</DeleteItem>
        </List>
      }
      trigger='click'
      placement='bottom'
      onOpenChange={setOpen}
      open={open}
    >
      <IconButton
        onClick={(e) => e.stopPropagation()}
        icon={<BsThreeDotsVertical />}
        ghost
        size='small'
      />
    </Popover>
  );
};
