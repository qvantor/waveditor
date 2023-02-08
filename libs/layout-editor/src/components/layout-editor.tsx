import { MouseEvent, useMemo } from 'react';
import { Subject } from 'rxjs';
import { Context, InternalEvents, InternalMouseEvents } from '../types';
import { useDnd, useElementSelection, useInternalState } from '../hooks';
import { ContextValue } from '../constants';
import { ElementRender } from './element-render';
import { HoverFrame } from './hover-frame';
import { SelectedFrame } from './selected-frame';

const config = { width: 600 };

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
      <div
        onMouseMove={rootMouseMove}
        onMouseLeave={rootMouseLeave}
        onClick={rootClick}
        style={{
          background: 'yellowgreen',
          userSelect: 'none',
        }}
      >
        <ElementRender id={props.root} width={config.width} />
        <HoverFrame />
        <SelectedFrame />
      </div>
    </ContextValue.Provider>
  );
}
