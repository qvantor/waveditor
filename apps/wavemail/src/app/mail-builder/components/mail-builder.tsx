import { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import {
  LayoutEditor,
  EditorEvents,
  ExternalEvents,
} from '@waveditors/layout-editor';
import { BehaviorSubject, Subject, fromEvent, filter } from 'rxjs';
import { undoRedoModule, useUnsubscribable } from '@waveditors/rxjs-react';
import { match } from 'ts-pattern';
import {
  layoutStore,
  useElementsStore,
  UndoRedoEvents,
  getElementParent,
  isLayoutStore,
} from '@waveditors/editor-model';
import { useHoverStore, selectedStore } from '../../common/store';
import { MailBuilderContext } from '../common/constants';
import { ElementCreation } from './element-creation';

const Root = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
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
      }),
      '2': {
        bs: new BehaviorSubject({
          id: '2',
          type: 'text',
          params: { content: 'Hello world 0' },
        }),
      },
      '3': {
        bs: new BehaviorSubject({
          id: '3',
          type: 'text',
          params: { content: '<p>Test is <strong>here</strong></p>' },
        }),
      },
      '4': {
        bs: new BehaviorSubject({
          id: '4',
          type: 'image',
          params: {
            url: '',
          },
        }),
      },
      '5': layoutStore({ undoRedo }).run({
        id: '5',
        type: 'layout',
        params: { columns: [[], ['3']] },
      }),
      '6': {
        bs: new BehaviorSubject({
          id: '2',
          type: 'text',
          params: { content: 'Hello world 1' },
        }),
      },
      '7': {
        bs: new BehaviorSubject({
          id: '2',
          type: 'text',
          params: { content: 'Hello world 2' },
        }),
      },
    },
    { undoRedo }
  );
  const hoverStore = useHoverStore(null, []);
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
  const selected = useMemo(() => selectedStore(), []);

  useUnsubscribable(() =>
    editorEvents.subscribe((e) =>
      match(e)
        .with({ type: 'MouseEnter' }, (event) =>
          hoverStore.actions.addHover(event.payload)
        )
        .with({ type: 'MouseLeave' }, () => hoverStore.actions.removeHover())
        .with({ type: 'ElementSelected' }, (event) =>
          selected.setSelected(event.payload)
        )
        .with({ type: 'ElementUnselected' }, selected.unselect)
        .with({ type: 'UnlinkElementFromLayout' }, (event) => {
          const parent = getElementParent(
            elementsStore.bs.value,
            event.payload
          );
          if (!parent)
            return console.error(
              `UnlinkElementFromLayout error, with ${event.payload}`
            );
          parent.actions.removeChild(event.payload);
          undoRedo.setGroupSize(1);
        })
        .with({ type: 'LinkElementToLayout' }, (event) => {
          const parent = elementsStore.bs.value[event.payload.position.layout];
          if (!parent || !isLayoutStore(parent)) return;
          parent.actions.addChild(event.payload);
          if (event.payload.samePosition) undoRedo.removeLastEvent();
        })
        .exhaustive()
    )
  );

  return (
    <MailBuilderContext.Provider
      value={{
        stores: {
          elements: elementsStore,
        },
        editor: {
          events: editorEvents,
          externalEvents: externalEvents,
        },
      }}
    >
      <Root>
        <ElementCreation />
        <LayoutEditor
          root='1'
          elements={elementsStore}
          events={editorEvents}
          externalEvents={externalEvents}
          hover={hoverStore.bs}
          selected={selected.selected}
        />
      </Root>
    </MailBuilderContext.Provider>
  );
};
