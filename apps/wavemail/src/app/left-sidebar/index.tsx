import React, { useState } from 'react';
import styled from 'styled-components';
import { tokens } from '@waveditors/theme';
import { BsLayoutWtf } from 'react-icons/bs';
import { HiOutlineVariable } from 'react-icons/hi';
import { Menu, MenuProps, ConfigProvider } from 'antd';
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
    // label: 'Elements',
    key: 'elements',
    icon: <BsLayoutWtf />,
  },
  {
    // label: 'Variables',
    key: 'variables',
    icon: <HiOutlineVariable />,
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

const MenuItemsSwitch = ({ menuKey }: { menuKey: MenuKeys }) => {
  switch (menuKey) {
    case 'elements':
      return <Elements />;
    case 'variables':
      return <Variables />;
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
        <MenuItemsSwitch menuKey={menu} />
      </MenuContent>
    </Root>
  );
};
