import { Drawer } from 'antd';
import styled from 'styled-components';
import { tokens } from '@waveditors/theme';
import { AiOutlineDelete } from 'react-icons/ai';
import { useCallback } from 'react';
import { GroupDocument, GroupQuery, useGroupQuery } from '../graphql/group.g';
import { IconButton, User, Empty } from '../../../common/components';
import { useRemoveUserFromGroupMutation } from '../graphql/remove-user-from-group.g';
import { client } from '../../../common/services';
import { GroupHeader } from './group-header';

interface Props {
  groupId: number;
  onClose: () => void;
}

const GroupDrawer = styled(Drawer)`
  .ant-drawer-header {
    padding: 0;
  }
`;

const UsersList = styled.div`
  display: flex;
  flex-direction: column;
  margin: -24px -24px 0 -24px;
`;

const DeleteButton = styled(IconButton)`
  color: ${tokens.color.text.danger};
  display: none;
`;

const UserItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
  height: 36px;
  border-bottom: 1px solid ${tokens.color.border.primary};

  &:hover {
    background: ${tokens.color.surface.quaternary};
  }

  &:hover ${DeleteButton} {
    display: block;
  }
`;

export const Group = ({ groupId, onClose }: Props) => {
  const { data, refetch } = useGroupQuery({
    variables: { groupId },
  });
  const [remove, { loading }] = useRemoveUserFromGroupMutation();
  const removeUserFromGroup = useCallback(
    (userId: number) => async () => {
      await remove({ variables: { groupId, userId } });
      client.cache.updateQuery(
        { query: GroupDocument, variables: { groupId } },
        (data: GroupQuery | null) => {
          if (!data) return null;
          return {
            group: {
              ...data.group,
              users: data.group.users?.filter((user) => user.id !== userId),
            },
          };
        }
      );
    },
    [remove, groupId]
  );
  return (
    <GroupDrawer
      open
      title={
        <GroupHeader
          name={data?.group.name ?? '...'}
          userIds={data?.group.users?.map((user) => user.id) ?? []}
          groupId={groupId}
          refetchGroup={refetch}
        />
      }
      onClose={onClose}
      closable={false}
    >
      <UsersList>
        {data?.group.users?.map((user) => (
          <UserItem key={user.id}>
            <User user={user} />
            <DeleteButton
              size='small'
              type='text'
              icon={<AiOutlineDelete />}
              onClick={removeUserFromGroup(user.id)}
              disabled={loading}
            />
          </UserItem>
        ))}
        {data?.group.users?.length === 0 && <Empty>Group is empty</Empty>}
      </UsersList>
    </GroupDrawer>
  );
};
