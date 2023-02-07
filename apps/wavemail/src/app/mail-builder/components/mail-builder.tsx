import { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import {
  ElementStore,
  LayoutEditor,
  EditorEvents,
  LinkElementToLayoutEvent,
  ElementsStore,
  isLayoutStore,
  LayoutStore,
} from '@waveditors/layout-editor';
import { BehaviorSubject, Subject } from 'rxjs';
import { hoverStore, selectedStore } from '../../common/store';
import { match } from 'ts-pattern';

const Root = styled.div`
  display: flex;
  justify-content: center;
`;

const findElementParent = (elements: ElementsStore, elementId: string) => {
  const parent = Object.entries(elements.value).find(
    (element): element is [string, LayoutStore] => {
      const [, store] = element;
      if (!isLayoutStore(store)) return false;
      return Boolean(
        store.value.params.columns.find((column) =>
          column.find((cElementId) => cElementId === elementId)
        )
      );
    }
  );
  return parent ? parent[1] : null;
};
const unlinkElementFromLayout = (
  elements: ElementsStore,
  elementId: string
) => {
  const parent = findElementParent(elements, elementId);
  if (!parent) return null;
  const newColumns = parent.value.params.columns.map((column) =>
    column.filter((cElementId) => cElementId !== elementId)
  );
  parent.next({
    ...parent.value,
    params: { ...parent.value.params, columns: newColumns },
  });
};
const linkElementToLayout = (
  elements: ElementsStore,
  {
    element,
    position: { layout, column, index, next },
  }: LinkElementToLayoutEvent['payload']
) => {
  const parent = elements.value[layout];
  if (!isLayoutStore(parent)) return null;
  const newColumns = parent.value.params.columns.map((col, i) => {
    if (i !== column) return col;
    const plus = next ? 1 : 0;
    return [...col.slice(0, index + plus), element, ...col.slice(index + plus)];
  });
  parent.next({
    ...parent.value,
    params: { ...parent.value.params, columns: newColumns },
  });
};

export const MailBuilder = () => {
  const elements = useMemo(
    () =>
      new BehaviorSubject<Record<string, ElementStore>>({
        '1': new BehaviorSubject({
          id: '1',
          type: 'layout',
          params: {
            columns: [['2', '4', '6', '7'], ['5'], []],
          },
        }),
        '2': new BehaviorSubject({
          id: '2',
          type: 'text',
          params: { content: 'Hello world 0' },
        }),
        '3': new BehaviorSubject({
          id: '3',
          type: 'text',
          params: { content: '<p>Test is <strong>here</strong></p>' },
        }),
        '4': new BehaviorSubject({
          id: '4',
          type: 'image',
          params: {
            url: '',
          },
        }),
        '5': new BehaviorSubject({
          id: '5',
          type: 'layout',
          params: { columns: [[], ['3']] },
        }),
        '6': new BehaviorSubject({
          id: '2',
          type: 'text',
          params: { content: 'Hello world 1' },
        }),
        '7': new BehaviorSubject({
          id: '2',
          type: 'text',
          params: { content: 'Hello world 2' },
        }),
      }),
    []
  );
  const editorEvents = useMemo(() => new Subject<EditorEvents>(), []);
  const hover = useMemo(() => hoverStore(), []);
  const selected = useMemo(() => selectedStore(), []);

  useEffect(() => {
    const sb = editorEvents.subscribe((e) =>
      match(e)
        .with({ type: 'MouseEnter' }, (event) => hover.addHover(event.payload))
        .with({ type: 'MouseLeave' }, hover.removeHover)
        .with({ type: 'ElementSelected' }, (event) =>
          selected.setSelected(event.payload)
        )
        .with({ type: 'ElementUnselected' }, selected.unselect)
        .with({ type: 'UnlinkElementFromLayout' }, (event) =>
          unlinkElementFromLayout(elements, event.payload)
        )
        .with({ type: 'LinkElementToLayout' }, (event) =>
          linkElementToLayout(elements, event.payload)
        )
        .exhaustive()
    );
    return () => sb.unsubscribe();
  }, [selected, hover, editorEvents, elements]);

  return (
    <Root className='canvas'>
      <LayoutEditor
        root='1'
        elements={elements}
        events={editorEvents}
        hover={hover.hover}
        selected={selected.selected}
      />
    </Root>
  );
};
