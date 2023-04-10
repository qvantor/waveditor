import { useMemo } from 'react';
import styled from 'styled-components';
import { EditorEvents, ExternalEvents } from '@waveditors/layout-editor';
import { Subject } from 'rxjs';
import { undoRedoModule, useUnsubscribable } from '@waveditors/rxjs-react';
import { match } from 'ts-pattern';
import {
  useElementsStore,
  UndoRedoEvents,
  getParentElement,
  getLayoutElement,
  useHoverStore,
  useSelectedStore,
  useTemplateConfigStore,
  useRelationsStore,
  elementsToElementsStore,
} from '@waveditors/editor-model';
import { tokens } from '@waveditors/theme';
import { RenderContextObject } from '@waveditors/layout-render';
import { MailBuilderContext } from '../../common/constants';
import { LeftSidebar } from '../../left-sidebar';
import { Canvas } from '../../canvas';
import { Header } from '../../header';
import { Hotkeys } from './hotkeys';

const Root = styled.div`
  height: 100vh;
`;
const Content = styled.div`
  height: calc(100vh - ${tokens.size.headerHeight});
  display: grid;
  grid-template-columns: 300px 1fr;
  justify-content: center;
  background: ${tokens.color.surface.primary};
`;

const CanvasContainer = styled.div`
  height: calc(100vh - ${tokens.size.headerHeight});
`;

const Footer = styled.div`
  height: calc(${tokens.size.footerHeight} - 1px);
  background: ${tokens.color.surface.secondary};
  border-top: 1px solid ${tokens.color.border.primary};
`;

export const MailBuilder = ({
  elements,
  relations,
  config,
}: RenderContextObject) => {
  const undoRedo = undoRedoModule<UndoRedoEvents>();
  const templateConfigStore = useTemplateConfigStore(config, {
    undoRedo,
  });
  const relationsStore = useRelationsStore(relations, {
    undoRedo,
  });
  const elementsStore = useElementsStore(
    elementsToElementsStore(elements, { undoRedo }),
    { undoRedo }
  );
  const hoverStore = useHoverStore(null, [elementsStore]);
  const selectedStore = useSelectedStore(null, [elementsStore]);

  const { editorEvents, externalEvents } = useMemo(
    () => ({
      editorEvents: new Subject<EditorEvents>(),
      externalEvents: new Subject<ExternalEvents>(),
    }),
    []
  );

  useUnsubscribable(
    () =>
      editorEvents.subscribe((e) =>
        match(e)
          .with({ type: 'MouseEnter' }, (event) => {
            hoverStore.actions.addHover(event.payload);
          })
          .with({ type: 'MouseLeave' }, () => hoverStore.actions.removeHover())
          .with({ type: 'ElementSelected' }, (event) =>
            selectedStore.actions.setSelected(event.payload)
          )
          .with({ type: 'ElementUnselected' }, selectedStore.actions.unselect)
          .with({ type: 'UnlinkElementFromLayout' }, (event) => {
            const parent = getParentElement(
              elementsStore.getValue(),
              event.payload
            );
            if (!parent)
              return console.error(`UnlinkElementFromLayout: ${event.payload}`);
            undoRedo.startBunch();
            parent.actions.removeChild(event.payload);
          })
          .with({ type: 'LinkElementToLayout' }, ({ payload }) => {
            const parent = getLayoutElement(
              elementsStore.getValue(),
              payload.position.layout
            );
            if (!parent)
              return console.error(
                `LinkElementToLayout: ${payload.position.layout}`
              );
            parent.actions.addChild(payload);
            if (payload.samePosition) undoRedo.removeLastEvent();
            undoRedo.endBunch();
          })
          .with(
            { type: 'AddElement' },
            ({ payload: { element, position } }) => {
              const parent = getLayoutElement(
                elementsStore.getValue(),
                position.position.layout
              );
              if (!parent)
                return console.error(`AddElement: ${position.position.layout}`);
              undoRedo.startBunch();
              elementsStore.actions.addElement(element);
              parent.actions.addChild(position);
              undoRedo.endBunch();
              selectedStore.actions.setSelected(element.id);
            }
          )
          .exhaustive()
      ),
    [elementsStore, hoverStore, selectedStore, editorEvents]
  );

  return (
    <MailBuilderContext.Provider
      value={{
        config: templateConfigStore,
        stores: {
          elements: elementsStore,
          relations: relationsStore,
          selected: selectedStore,
          hover: hoverStore,
        },
        editor: {
          events: editorEvents,
          externalEvents,
        },
        modules: {
          undoRedo,
        },
      }}
    >
      <Root>
        <Header />
        <Content>
          <LeftSidebar />
          <CanvasContainer>
            <Canvas />
            <Footer />
          </CanvasContainer>
        </Content>
        <Hotkeys />
      </Root>
    </MailBuilderContext.Provider>
  );
};