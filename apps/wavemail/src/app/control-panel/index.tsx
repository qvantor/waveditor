import styled from 'styled-components';
import { tokens } from '@waveditors/theme';
import {
  matchPath,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { Menu, MenuProps } from 'antd';
import { BsLayoutWtf, BsPeople } from 'react-icons/bs';
import { useMemo } from 'react';
import { Header } from '../common/components';
import {
  CONTROL_PANEL,
  CONTROL_PANEL_GROUPS,
  CONTROL_PANEL_TEMPLATES,
} from '../common/constants';
import { Templates } from './templates';
import { Groups } from './groups';

type MenuItem = Required<MenuProps>['items'][number];

const Root = styled.div`
  display: flex;
  min-height: calc(100vh - ${tokens.size.headerHeight});
`;
const Sidebar = styled.div`
  width: 250px;
  display: flex;
`;
const Content = styled.div`
  flex: 1;
  padding: 0 20px;
  background: ${tokens.color.surface.quaternary};
`;
const MenuInternal = styled(Menu)`
  flex: 1;
`;
const MenuItems = [
  {
    key: 'templates',
    label: 'Templates',
    icon: <BsLayoutWtf />,
  },
  {
    key: 'groups',
    label: 'Groups',
    icon: <BsPeople />,
  },
] as const;

type Keys = (typeof MenuItems)[number]['key'];

const keyToRoute: Record<(typeof MenuItems)[number]['key'], string[]> = {
  templates: [CONTROL_PANEL_TEMPLATES],
  groups: [CONTROL_PANEL_GROUPS],
};
export const ControlPanel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const menuItem = useMemo(
    () =>
      (
        MenuItems.find((item) =>
          keyToRoute[item.key].some((path) =>
            matchPath(CONTROL_PANEL + path, location.pathname)
          )
        ) ?? MenuItems[0]
      ).key,
    [location]
  );
  return (
    <>
      <Header />
      <Root>
        <Sidebar>
          <MenuInternal
            items={MenuItems as unknown as MenuItem[]}
            selectedKeys={[menuItem]}
            onClick={(e) => navigate(`.${keyToRoute[e.key as Keys][0]}`)}
          />
        </Sidebar>
        <Content>
          <Routes>
            <Route path={CONTROL_PANEL_TEMPLATES} element={<Templates />} />
            <Route path={CONTROL_PANEL_GROUPS} element={<Groups />} />
            <Route
              path='*'
              element={<Navigate to={`.${CONTROL_PANEL_TEMPLATES}`} />}
            />
          </Routes>
        </Content>
      </Root>
    </>
  );
};
