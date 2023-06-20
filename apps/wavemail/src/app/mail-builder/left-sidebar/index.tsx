import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import styled from 'styled-components';
import { tokens } from '@waveditors/theme';
import { BsLayoutWtf, BsClockHistory } from 'react-icons/bs';
import { HiOutlineVariable } from 'react-icons/hi';
import { ConfigProvider, Menu, MenuProps } from 'antd';
import { VersionsSidebar } from '../versions';
import { Elements } from './elements';
import { Variables } from './variables';

type MenuItem = Required<MenuProps>['items'][number];

const Root = styled.div`
  background: ${tokens.color.surface.secondary};
  border-right: 1px solid ${tokens.color.border.primary};
  height: calc(100vh - ${tokens.size.headerHeight});
  overflow: hidden;
  display: grid;
  grid-template-columns: 40px 1fr;
`;
const MenuContent = styled.div`
  height: calc(100vh - ${tokens.size.headerHeight});
  overflow-y: auto;
`;
const items = [
  {
    key: 'elements',
    icon: <BsLayoutWtf />,
  },
  {
    key: 'variables',
    icon: <HiOutlineVariable />,
  },
  {
    key: 'versions',
    icon: <BsClockHistory />,
  },
  // {
  //   label: 'Settings',
  //   key: 'settings',
  //   icon: <AiOutlineSetting />,
  // },
] as const;
type MenuKeys = (typeof items)[number]['key'];

const MenuInternal = styled(Menu)`
  height: calc(100vh - ${tokens.size.headerHeight});
  width: 40px;
`;

type Props = {
  menuKey: MenuKeys;
  setMenu: Dispatch<SetStateAction<MenuKeys>>;
};

const MenuItemsSwitch = ({ menuKey, setMenu }: Props) => {
  const onVersionsClose = useCallback(() => setMenu('elements'), [setMenu]);
  switch (menuKey) {
    case 'elements':
      return <Elements />;
    case 'variables':
      return <Variables />;
    case 'versions':
      return <VersionsSidebar onClose={onVersionsClose} />;
  }
};

export const LeftSidebar = () => {
  const [menu, setMenu] = useState<MenuKeys>('elements');
  return (
    <Root>
      <ConfigProvider theme={{ token: { borderRadiusLG: 4 } }}>
        <MenuInternal
          mode='inline'
          inlineCollapsed
          items={items as unknown as MenuItem[]}
          onClick={(e) => setMenu(e.key as MenuKeys)}
          selectedKeys={[menu]}
        />
      </ConfigProvider>
      <MenuContent>
        <MenuItemsSwitch menuKey={menu} setMenu={setMenu} />
      </MenuContent>
    </Root>
  );
};
