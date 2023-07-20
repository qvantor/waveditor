import { useCallback, useRef } from 'react';
import { match } from 'ts-pattern';
import { filter, noop } from 'rxjs';
import { useSubscription } from '@waveditors/rxjs-react';
import { useBuilderContext } from '@waveditors/editor-model';
import { ELEMENT_DATATYPE } from '../constants';
import { Context, RootMouseMoveEvent } from '../types';

export const useElementSelection = ({
  internalEvents,
  internalState: { isDnd, isInteractive },
}: Context) => {
  const {
    editor: { events },
  } = useBuilderContext();
  const currentHover = useRef<string | null>(null);

  const setHover = useCallback(
    (payload: string) => {
      events.next({ type: 'MouseEnter', payload });
    },
    [events]
  );
  const clearHover = useCallback(() => {
    events.next({ type: 'MouseLeave', payload: null });
  }, [events]);

  const onClick = useCallback(() => {
    events.next(
      currentHover.current
        ? { type: 'ElementSelected', payload: currentHover.current }
        : {
            type: 'ElementUnselected',
            payload: null,
          }
    );
  }, [events]);

  const onMouseMove = useCallback(
    ({ payload }: RootMouseMoveEvent) => {
      const value =
        (payload.target as Element).closest(`[datatype=${ELEMENT_DATATYPE}]`)
          ?.id ?? null;
      if (value === currentHover.current) return;
      currentHover.current = value;
      value ? setHover(value) : clearHover();
    },
    [setHover, clearHover]
  );

  useSubscription(() =>
    internalEvents
      .pipe(filter(() => !isDnd.value && isInteractive.value))
      .subscribe((event) =>
        match(event)
          .with({ type: 'RootMouseMove' }, onMouseMove)
          .with({ type: 'RootClick' }, onClick)
          .otherwise(noop)
      )
  );
};
