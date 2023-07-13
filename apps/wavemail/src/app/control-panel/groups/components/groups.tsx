import { AiOutlinePlus, AiOutlineDelete } from 'react-icons/ai';
import { Tag, Popconfirm } from 'antd';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  AddButton,
  ContentSubheader,
  ListContainer,
  ListItem,
  ListItemContent,
  ListItemHeader,
  ListItemName,
  ListItemFooter,
  ListItemActionButton,
} from '../../common';
import {
  GroupsDocument,
  GroupsQuery,
  useGroupsQuery,
} from '../../../common/graphql/groups.g';
import { useCreateGroupMutation } from '../graphql/create-group.g';
import { Empty, User } from '../../../common/components';
import { useDeleteGroupMutation } from '../graphql/delete-group.g';
import { client } from '../../../common/services';
import { Group } from './group';

const ListItemActionButtonInternal = styled(ListItemActionButton)`
  display: none;
`;

const ListItemInternal = styled(ListItem)`
  &:hover ${ListItemActionButtonInternal} {
    display: block;
  }
`;

export const Groups = () => {
  const { data, refetch } = useGroupsQuery();
  const [selected, setSelected] = useState<number | null>(null);
  const [createGroup, { loading }] = useCreateGroupMutation({
    onCompleted: (data) => setSelected(data.createGroup.id),
  });
  const [deleteGroup, { loading: deleteLoading }] = useDeleteGroupMutation();
  const onClose = useCallback(() => setSelected(null), []);
  const deleteGroupInternal = useCallback(
    (groupId: number) => async () => {
      await deleteGroup({ variables: { groupId } });
      client.cache.updateQuery(
        { query: GroupsDocument },
        (data: GroupsQuery | null) => {
          if (!data) return null;
          return {
            groups: data.groups.filter((group) => group.id !== groupId),
          };
        }
      );
    },
    [deleteGroup]
  );
  useEffect(() => {
    if (!selected) refetch();
  }, [selected, refetch]);
  return (
    <>
      {selected && <Group groupId={selected} onClose={onClose} />}
      <ContentSubheader>
        <h2>Groups</h2>
        <AddButton
          onClick={createGroup}
          type='primary'
          icon={<AiOutlinePlus />}
          disabled={loading}
        >
          Add
        </AddButton>
      </ContentSubheader>
      {data?.groups.length === 0 ? (
        <Empty>No groups</Empty>
      ) : (
        <ListContainer>
          {data?.groups.map((group) => (
            <ListItemInternal
              onClick={() => setSelected(group.id)}
              key={group.id}
            >
              <ListItemContent>
                <ListItemHeader>
                  <div>
                    <Tag color='blue'>Templates: {group.templatesCount}</Tag>
                    <Tag color='green'>Users: {group.usersCount}</Tag>
                  </div>
                  <div onClick={(e) => e.stopPropagation()}>
                    <Popconfirm
                      title={`Delete ${group.name} group?`}
                      onConfirm={deleteGroupInternal(group.id)}
                    >
                      <ListItemActionButtonInternal
                        icon={<AiOutlineDelete />}
                        ghost
                        size='small'
                        disabled={deleteLoading}
                      />
                    </Popconfirm>
                  </div>
                </ListItemHeader>
                <ListItemName>{group.name}</ListItemName>
                <ListItemFooter>
                  <User user={group.creator} />
                  <span>{dayjs(group.createdAt).fromNow()}</span>
                </ListItemFooter>
              </ListItemContent>
            </ListItemInternal>
          ))}
        </ListContainer>
      )}
    </>
  );
};
