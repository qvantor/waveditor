import { MouseEvent, useMemo } from 'react';
import { Subject } from 'rxjs';
import styled from 'styled-components';
import { Context, InternalEvents, InternalMouseEvents } from '../types';
import { useDnd, useElementSelection, useInternalState } from '../hooks';
import { ContextValue, LAYOUT_EDITOR_ID } from '../constants';
import { ElementRender } from './element-render';
import { HoverFrame } from './hover-frame';
import { SelectedFrame } from './selected-frame';

const Root = styled.div`
  position: relative;
`;

export function LayoutEditor(
  props: Omit<Context, 'internalEvents' | 'internalState'>
) {
  const internalState = useInternalState();

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
  useDnd(context);

  return (
    <ContextValue.Provider value={context}>
      <Root
        id={LAYOUT_EDITOR_ID}
        onMouseMove={rootMouseMove}
        onMouseLeave={rootMouseLeave}
        onClick={(e) => {
          e.stopPropagation();
          rootClick(e);
        }}
        style={{
          width: props.viewportWidth,
        }}
      >
        <ElementRender id={props.root} width={props.viewportWidth} />
        <HoverFrame />
        <SelectedFrame />
      </Root>
    </ContextValue.Provider>
  );
}
