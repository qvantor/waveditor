import { useMemo } from 'react';
import styled from 'styled-components';
import { EditorEvents, ExternalEvents } from '@waveditors/layout-editor';
import { Subject } from 'rxjs';
import { undoRedoModule, useUnsubscribable } from '@waveditors/rxjs-react';
import { match } from 'ts-pattern';
import {
  layoutStore,
  textStore,
  imageStore,
  useElementsStore,
  UndoRedoEvents,
  getParentElement,
  getLayoutElement,
  useHoverStore,
  useSelectedStore,
  useTemplateConfigStore,
  useRelationsStore,
  createInitialRelations,
  createInitialTemplateConfig,
} from '@waveditors/editor-model';
import { tokens } from '@waveditors/theme';
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

export const MailBuilder = () => {
  const undoRedo = useUnsubscribable(() => undoRedoModule<UndoRedoEvents>());
  const elementsStore = useElementsStore(
    {
      '1': layoutStore({ undoRedo }).run({
        id: '1',
        type: 'layout',
        params: {
          columns: [['2', '4', '6', '7'], ['5'], []],
        },
        style: {
          backgroundColor: '#fff',
          margin: '0px auto',
        },
      }),
      '2': textStore({ undoRedo }).run({
        id: '2',
        type: 'text',
        params: {
          content: {
            type: 'doc',
            content: [
              {
                type: 'paragraph',
                content: [{ type: 'text', text: 'hello world 2' }],
              },
            ],
          },
        },
        style: {},
      }),
      '3': textStore({ undoRedo }).run({
        id: '3',
        type: 'text',
        params: {
          content: {
            type: 'doc',
            content: [
              {
                type: 'paragraph',
                content: [{ type: 'text', text: 'hello world 3' }],
              },
            ],
          },
        },
        style: {},
      }),
      '4': imageStore({ undoRedo }).run({
        id: '4',
        type: 'image',
        params: {
          url: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80',
        },
        style: {
          display: 'block',
          maxWidth: '100%',
        },
      }),
      '5': layoutStore({ undoRedo }).run({
        id: '5',
        type: 'layout',
        params: { columns: [[], ['3']] },
        style: {},
      }),
      '6': textStore({ undoRedo }).run({
        id: '6',
        type: 'text',
        params: {
          content: {
            type: 'doc',
            content: [
              {
                type: 'paragraph',
                content: [{ type: 'text', text: 'hello world 6' }],
              },
            ],
          },
        },
        style: {},
        link: {
          url: 'https://google.com',
        },
      }),
      '7': textStore({ undoRedo }).run({
        id: '7',
        type: 'text',
        params: {
          content: {
            type: 'doc',
            content: [
              {
                type: 'paragraph',
                content: [{ type: 'text', text: 'hello world 7' }],
              },
            ],
          },
        },
        style: {},
      }),
    },
    { undoRedo }
  );
  const relationsStore = useRelationsStore(createInitialRelations(), {
    undoRedo,
  });
  const templateConfigStore = useTemplateConfigStore(
    createInitialTemplateConfig('1'),
    { undoRedo }
  );
  const hoverStore = useHoverStore(null, []);
  const selectedStore = useSelectedStore(null, []);

  const { editorEvents, externalEvents } = useMemo(
    () => ({
      editorEvents: new Subject<EditorEvents>(),
      externalEvents: new Subject<ExternalEvents>(),
    }),
    []
  );

  useUnsubscribable(() =>
    editorEvents.subscribe((e) =>
      match(e)
        .with({ type: 'MouseEnter' }, (event) =>
          hoverStore.actions.addHover(event.payload)
        )
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
        .with({ type: 'AddElement' }, ({ payload: { element, position } }) => {
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
        })
        .exhaustive()
    )
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
