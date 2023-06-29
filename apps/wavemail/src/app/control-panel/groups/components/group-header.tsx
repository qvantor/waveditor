import { AiOutlineEdit, AiOutlineSave } from 'react-icons/ai';
import { InputRef, Select } from 'antd';
import styled from 'styled-components';
import { font, tokens } from '@waveditors/theme';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Empty, IconButton, Input, User } from '../../../common/components';
import { maxLength, required, validate } from '../../../common/services';
import { useUsersQuery } from '../../../common/graphql/users.g';
import { useAddUsersToGroupMutation } from '../graphql/add-users-to-group.g';
import { useSetGroupNameMutation } from '../graphql/set-group-name.g';

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid ${tokens.color.border.primary};
  ${font({ type: 'header', size: 'small', weight: 'bold' })}
`;
const NameInput = styled(Input)`
  ${font({ type: 'header', size: 'small', weight: 'bold' })}
  &.ant-input-disabled:disabled {
    color: ${tokens.color.text.primary};
  }
`;
const AddUserPanel = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  background: ${tokens.color.surface.quaternary};
`;

interface Props {
  groupId: number;
  name: string;
  userIds: number[];
  refetchGroup: () => Promise<unknown>;
}

export const GroupHeader = ({
  groupId,
  name,
  userIds,
  refetchGroup,
}: Props) => {
  const nameInput = useRef<InputRef>(null);
  const [addUsers, setAddUsers] = useState<number[]>([]);
  const [nameEdit, setNameEdit] = useState(false);
  const toggleEditName = useCallback(() => setNameEdit((prev) => !prev), []);
  const [addUsersToGroup, { loading }] = useAddUsersToGroupMutation();
  const [setGroupName, { loading: nameLoading }] = useSetGroupNameMutation();
  const saveGroupName = useCallback(
    async (name?: string) => {
      if (!name) return;
      await setGroupName({ variables: { name, groupId } });
    },
    [setGroupName, groupId]
  );
  const saveUsers = useCallback(async () => {
    await addUsersToGroup({ variables: { groupId, users: addUsers } });
    setAddUsers([]);
    await refetchGroup();
  }, [addUsersToGroup, addUsers, groupId, refetchGroup]);
  const { data: users } = useUsersQuery({
    variables: { filter: { ids: userIds } },
  });
  useEffect(() => {
    if (nameEdit) nameInput.current?.focus();
  }, [nameEdit]);
  return (
    <>
      <Header>
        <NameInput
          value={name}
          onChange={saveGroupName}
          bordered={false}
          disabled={nameLoading || !nameEdit}
          validate={validate(required, maxLength(16))}
          onBlur={toggleEditName}
          ref={nameInput}
        />
        <IconButton
          icon={<AiOutlineEdit />}
          type='text'
          onClick={toggleEditName}
          disabled={nameLoading || nameEdit}
        />
      </Header>
      <AddUserPanel>
        <Select
          showSearch
          placeholder='Add user'
          style={{ width: '100%' }}
          options={users?.users.map((user) => ({
            label: <User user={user} />,
            value: user.id,
          }))}
          bordered={false}
          mode='multiple'
          onChange={setAddUsers}
          value={addUsers}
          disabled={loading}
          notFoundContent={<Empty>No more users to add</Empty>}
        />
        <IconButton
          icon={<AiOutlineSave />}
          type='text'
          disabled={addUsers.length === 0}
          onClick={saveUsers}
        />
      </AddUserPanel>
    </>
  );
};
