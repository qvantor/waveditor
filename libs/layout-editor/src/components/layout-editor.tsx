import { MouseEvent, useMemo } from 'react';
import { fromEvent, Subject } from 'rxjs';
import styled from 'styled-components';
import { Head, useSetBodyStyle } from '@waveditors/layout-render';
import { useBsSelector, useSubscription } from '@waveditors/rxjs-react';
import {
  getConfigRootElementId,
  useBuilderContext,
} from '@waveditors/editor-model';
import { Context, InternalEvents, InternalMouseEvents } from '../types';
import { useDnd, useElementSelection, useInternalState } from '../hooks';
import { ContextValue } from '../constants';
import { HoverFrame } from './hover-frame';
import { SelectedFrame } from './selected-frame';
import { Element } from './elements';

const Root = styled.div`
  position: relative;
  min-height: 100vh;
`;

const RenderElement = () => {
  const {
    model: { config },
  } = useBuilderContext();
  const rootElementId = useBsSelector(config.bs, getConfigRootElementId);
  const width = config.getValue().viewportWidth;
  return <Element id={rootElementId} width={width} />;
};

export function LayoutEditor({ iFrameDocument }: { iFrameDocument: Document }) {
  const internalState = useInternalState();
  const {
    editor: { events },
  } = useBuilderContext();

  const context = useMemo(() => {
    const internalEvents = new Subject<InternalEvents>();
    const context: Context = {
      internalState,
      internalEvents,
      iFrameDocument,
    };
    return context;
  }, [internalState, iFrameDocument]);

  const { rootMouseMove, rootClick, rootMouseLeave } = useMemo(() => {
    const generalMouseEvent =
      (type: InternalMouseEvents['type']) => (payload: MouseEvent) =>
        context.internalEvents.next({ type, payload });

    const rootMouseMove = generalMouseEvent('RootMouseMove');
    const rootClick = generalMouseEvent('RootClick');
    const rootMouseLeave = generalMouseEvent('RootMouseLeave');
    return { rootMouseMove, rootClick, rootMouseLeave };
  }, [context]);
  // pass scroll event to global context
  useSubscription(
    () =>
      fromEvent(iFrameDocument, 'scroll').subscribe((payload) =>
        events.next({ type: 'CanvasScroll', payload })
      ),
    [iFrameDocument, events]
  );
  // pass keydown event to global context
  useSubscription(
    () =>
      fromEvent<KeyboardEvent>(iFrameDocument, 'keydown').subscribe((payload) =>
        events.next({ type: 'CanvasKeyDown', payload })
      ),
    [iFrameDocument, events]
  );

  useElementSelection(context);
  useDnd(context);
  useSetBodyStyle(iFrameDocument);

  return (
    <ContextValue.Provider value={context}>
      <Head iFrameDocument={context.iFrameDocument} />
      <Root
        onMouseMove={rootMouseMove}
        onMouseLeave={rootMouseLeave}
        onClick={(e) => {
          e.stopPropagation();
          rootClick(e);
        }}
      >
        <RenderElement />
        <SelectedFrame />
        <HoverFrame />
      </Root>
    </ContextValue.Provider>
  );
}
