import { useCallback } from 'react';
import {
  EditorSnapshot,
  ElementType,
  useBuilderContext,
} from '@waveditors/editor-model';
import { Tabs } from 'antd';
import { createStore, useBehaviorSubject } from '@waveditors/rxjs-react';
import styled from 'styled-components';
import { CreateElement } from '../../common/components';
import { useTypeToElement } from '../../common/hooks';
import { Hider } from '../../../common/components';
import { CreateComponent } from './components';

const currentTab = createStore<'components' | 'elements'>()
  .addActions({
    setTab: (value: 'components' | 'elements') => value,
  })
  .run('components');

const items = [
  {
    key: 'components',
    label: 'Components',
  },
  {
    key: 'elements',
    label: 'Elements',
  },
];
const Root = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const TabsInternal = styled(Tabs)`
  &.ant-tabs-top > .ant-tabs-nav {
    margin-bottom: 10px;
    padding: 0 10px;
  }
`;

const HiderInternal = styled(Hider)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

interface Props {
  className?: string;
}

export const CreateItem = ({ className }: Props) => {
  const {
    editor: { commands },
  } = useBuilderContext();
  const tab = useBehaviorSubject(currentTab.bs);
  const typeToElement = useTypeToElement();
  const onMouseDown = useCallback(
    (type: ElementType) =>
      commands.next({
        type: 'OutsideDragStarted',
        payload: { type: 'element', element: typeToElement(type) },
      }),
    [commands, typeToElement]
  );
  const onClick = useCallback(
    () => commands.next({ type: 'OutsideDragToClick' }),
    [commands]
  );
  const onComponentMouseDown = useCallback(
    (element: EditorSnapshot) =>
      commands.next({
        type: 'OutsideDragStarted',
        payload: { type: 'component', element },
      }),
    [commands]
  );

  return (
    <Root className={className}>
      <TabsInternal
        items={items}
        activeKey={tab}
        onChange={(value) =>
          currentTab.actions.setTab(
            value === 'components' ? 'components' : 'elements'
          )
        }
      />
      <HiderInternal isHidden={tab === 'elements'}>
        <CreateComponent onClick={onClick} onMouseDown={onComponentMouseDown} />
      </HiderInternal>
      <HiderInternal isHidden={tab === 'components'}>
        <CreateElement onClick={onClick} onMouseDown={onMouseDown} />
      </HiderInternal>
    </Root>
  );
};
