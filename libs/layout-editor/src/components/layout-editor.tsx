import { MouseEvent, useMemo } from 'react';
import { Subject } from 'rxjs';
import styled from 'styled-components';
import {
  Head,
  useSetBodyStyle,
  useRenderContext,
} from '@waveditors/layout-render';
import { useBsSelector } from '@waveditors/rxjs-react';
import { getTemplateConfigRootElementId } from '@waveditors/editor-model';
import { Context, InternalEvents, InternalMouseEvents } from '../types';
import { useDnd, useElementSelection, useInternalState } from '../hooks';
import { ContextValue } from '../constants';
import { HoverFrame } from './hover-frame';
import { SelectedFrame } from './selected-frame';
import { Element } from './elements';

const Root = styled.div`
  position: relative;
  min-height: 100%;
`;

const RenderElement = () => {
  const { config } = useRenderContext();
  const rootElementId = useBsSelector(config, getTemplateConfigRootElementId);
  const width = config.getValue().viewportWidth;
  return <Element id={rootElementId} width={width} />;
};

export function LayoutEditor(
  props: Omit<Context, 'internalEvents' | 'internalState'>
) {
  const internalState = useInternalState();
  const renderContext = useRenderContext();

  const { internalEvents, rootMouseMove, rootClick, rootMouseLeave } =
    useMemo(() => {
      const internalEvents = new Subject<InternalEvents>();
      const generalMouseEvent =
        (type: InternalMouseEvents['type']) => (payload: MouseEvent) =>
          internalEvents.next({ type, payload });

      const rootMouseMove = generalMouseEvent('RootMouseMove');
      const rootClick = generalMouseEvent('RootClick');
      const rootMouseLeave = generalMouseEvent('RootMouseLeave');
      return { internalEvents, rootMouseMove, rootClick, rootMouseLeave };
    }, []);
  const context: Context = {
    ...props,
    internalState,
    internalEvents,
  };
  useElementSelection(context);
  useDnd(context, renderContext);

  useSetBodyStyle(props.iFrameDocument);

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
