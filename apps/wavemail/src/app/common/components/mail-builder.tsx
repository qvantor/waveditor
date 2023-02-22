import { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { EditorEvents, ExternalEvents } from '@waveditors/layout-editor';
import { Subject, fromEvent, filter } from 'rxjs';
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
} from '@waveditors/editor-model';
import { tokens } from '@waveditors/theme';
import { MailBuilderContext } from '../constants';
import { LeftSidebar } from '../../left-sidebar';
import { Canvas } from '../../canvas';

const Root = styled.div`
  height: 100vh;
  //overflow: hidden;
`;
const Header = styled.div`
  height: ${tokens.size.headerHeight};
  background: ${tokens.color.surface.tertiary};
`;
const Content = styled.div`
  height: calc(100vh - ${tokens.size.headerHeight});
  display: grid;
  grid-template-columns: 320px 1fr;
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
        style: {},
      }),
      '2': textStore({ undoRedo }).run({
        id: '2',
        type: 'text',
        params: { content: 'Hello world 0' },
        style: {},
      }),

      '3': textStore({ undoRedo }).run({
        id: '3',
        type: 'text',
        params: { content: '<p>Test is <strong>here</strong></p>' },
        style: {},
      }),
      '4': imageStore({ undoRedo }).run({
        id: '4',
        type: 'image',
        params: {
          url: '',
        },
        style: {},
      }),
      '5': layoutStore({ undoRedo }).run({
        id: '5',
        type: 'layout',
        params: { columns: [[], ['3']] },
        style: {},
      }),
      '6': textStore({ undoRedo }).run({
        id: '2',
        type: 'text',
        params: { content: 'Hello world 1' },
        style: {},
      }),
      '7': textStore({ undoRedo }).run({
        id: '2',
        type: 'text',
        params: { content: 'Hello world 2' },
        style: {},
      }),
    },
    { undoRedo }
  );
  const hoverStore = useHoverStore(null, []);
  const selectedStore = useSelectedStore(null, []);
  useEffect(() => {
    fromEvent<KeyboardEvent>(document, 'keydown')
      .pipe(filter((event) => ['z', 'x'].includes(event.key)))
      .subscribe((e) => {
        match(e)
          .with({ key: 'z' }, () => undoRedo.undo.next())
          .otherwise(() => undoRedo.redo.next());
      });
  }, [undoRedo]);
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
          parent.actions.removeChild(event.payload);
          undoRedo.setGroupSize(1);
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
        })
        .with({ type: 'AddElement' }, ({ payload: { element, position } }) => {
          const parent = getLayoutElement(
            elementsStore.getValue(),
            position.position.layout
          );
          if (!parent)
            return console.error(`AddElement: ${position.position.layout}`);
          undoRedo.setGroupSize(1);
          elementsStore.actions.addElement(element);
          parent.actions.addChild(position);
        })
        .exhaustive()
    )
  );

  return (
    <MailBuilderContext.Provider
      value={{
        config: {
          viewportWidth: 600,
        },
        stores: {
          elements: elementsStore,
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
      </Root>
    </MailBuilderContext.Provider>
  );
};
