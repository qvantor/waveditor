import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import styled from 'styled-components';
import { tokens } from '@waveditors/theme';
import { BsLayoutWtf, BsClockHistory } from 'react-icons/bs';
import { HiOutlineVariable } from 'react-icons/hi';
import { AiOutlineSetting } from 'react-icons/ai';
import { ConfigProvider, Menu, MenuProps } from 'antd';
import { VersionsSidebar } from '../versions';
import { SidebarRoot } from '../common/components';
import { Elements } from './elements';
import { Variables } from './variables';
import { Config } from './config';

type MenuItem = Required<MenuProps>['items'][number];

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
  {
    key: 'config',
    icon: <AiOutlineSetting />,
  },
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
    case 'config':
      return <Config />;
  }
};

export const LeftSidebar = () => {
  const [menu, setMenu] = useState<MenuKeys>('elements');
  return (
    <SidebarRoot>
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
    </SidebarRoot>
  );
};
