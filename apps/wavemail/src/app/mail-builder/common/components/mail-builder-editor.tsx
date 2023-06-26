import { memo } from 'react';
import styled from 'styled-components';
import { useUnsubscribable } from '@waveditors/rxjs-react';
import { match } from 'ts-pattern';
import {
  BuilderProvider,
  createBuilderContext,
  getLayoutElement,
  getParentElement,
  EditorSnapshot,
} from '@waveditors/editor-model';
import { tokens } from '@waveditors/theme';
import { LeftSidebar } from '../../left-sidebar';
import { Canvas } from '../../canvas';
import { Header } from './header';
import { Hotkeys } from './hotkeys';
import { BuilderContextSubscribe } from './builder-context-subscribe';

const Root = styled.div`
  height: 100vh;
`;
const Content = styled.div`
  height: calc(100vh - ${tokens.size.headerHeight});
  display: grid;
  grid-template-columns: 330px 1fr;
  justify-content: center;
  background: ${tokens.color.surface.primary};
  overflow: hidden;
`;

interface Props {
  snapshot: EditorSnapshot;
}

export const MailBuilderEditor = memo(({ snapshot }: Props) => {
  const builderContext = createBuilderContext(snapshot);

  const {
    model: { elements },
    editor: { events },
    interaction: { hover, selected },
    module: { undoRedo },
  } = builderContext;

  useUnsubscribable(
    () =>
      events.subscribe((e) =>
        match(e)
          .with({ type: 'MouseEnter' }, (event) => {
            hover.actions.addHover(event.payload);
          })
          .with({ type: 'MouseLeave' }, () => hover.actions.removeHover())
          .with({ type: 'ElementSelected' }, (event) =>
            selected.actions.setSelected(event.payload)
          )
          .with({ type: 'ElementUnselected' }, selected.actions.unselect)
          .with({ type: 'UnlinkElementFromLayout' }, (event) => {
            const parent = getParentElement(elements.getValue(), event.payload);
            if (!parent)
              return console.error(`UnlinkElementFromLayout: ${event.payload}`);
            undoRedo.startBunch();
            parent.actions.removeChild(event.payload);
          })
          .with({ type: 'LinkElementToLayout' }, ({ payload }) => {
            const parent = getLayoutElement(
              elements.getValue(),
              payload.position.layout
            );
            if (!parent)
              return console.error(
                `LinkElementToLayout: ${payload.position.layout}`
              );
            parent.actions.addChild(payload);
            undoRedo.endBunch();
            if (payload.samePosition) undoRedo.removeLastEvent();
          })
          .with(
            { type: 'AddElement' },
            ({ payload: { element, position } }) => {
              const parent = getLayoutElement(
                elements.getValue(),
                position.position.layout
              );
              if (!parent)
                return console.error(`AddElement: ${position.position.layout}`);
              undoRedo.startBunch();
              elements.actions.addElement(element);
              parent.actions.addChild(position);
              undoRedo.endBunch();
              selected.actions.setSelected(element.id);
            }
          )
          .exhaustive()
      ),
    [elements, hover, selected, events]
  );

  return (
    <BuilderProvider value={builderContext}>
      <Root>
        <Header />
        <Content>
          <LeftSidebar />
          <Canvas />
        </Content>
        <Hotkeys />
        <BuilderContextSubscribe />
      </Root>
    </BuilderProvider>
  );
});
