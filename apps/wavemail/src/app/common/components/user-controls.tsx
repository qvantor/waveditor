import { Menu } from 'antd';
import { useBsSelector } from '@waveditors/rxjs-react';
import styled from 'styled-components';
import { tokens } from '@waveditors/theme';
import { AiOutlineLogout, AiOutlineUser } from 'react-icons/ai';
import { useMemo } from 'react';
import { authStore, getUserFromToken } from '../../auth';
import { userToUserName } from '../services';

const UserMenu = styled(Menu)`
  &.ant-menu-dark {
    background: ${tokens.color.surface.tertiary};
  }
`;

export const UserControls = () => {
  const user = useBsSelector(authStore.bs, getUserFromToken);
  const items = useMemo(
    () => [
      {
        label: userToUserName(user),
        key: 'user',
        icon: <AiOutlineUser />,
        children: [
          {
            label: 'Logout',
            key: 'logout',
            icon: <AiOutlineLogout />,
            onClick: authStore.actions.logout,
          },
        ],
      },
    ],
    [user]
  );
  return (
    <UserMenu mode='horizontal' theme='dark' selectedKeys={[]} items={items} />
  );
};
