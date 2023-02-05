import { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import {
  ElementStore,
  LayoutEditor,
  EditorEvents,
} from '@waveditors/layout-editor';
import { BehaviorSubject, Subject } from 'rxjs';
import { hoverStore, selectedStore } from '../../common/store';
import { match } from 'ts-pattern';

const Root = styled.div`
  display: flex;
  justify-content: center;
`;

export const MailBuilder = () => {
  const elements = useMemo(
    () =>
      new BehaviorSubject<Record<string, ElementStore>>({
        '1': new BehaviorSubject({
          id: '1',
          type: 'layout',
          params: {
            columns: [['2', '4'], ['5'], []],
          },
        }),
        '2': new BehaviorSubject({
          id: '2',
          type: 'text',
          params: { content: 'Hello world' },
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
        .exhaustive()
    );
    return () => sb.unsubscribe();
  }, [selected, hover, editorEvents]);

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
