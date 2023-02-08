import { useCallback, useRef } from 'react';
import { match, P } from 'ts-pattern';
import { filter, noop } from 'rxjs';
import { useSubscription } from '@waveditors/rxjs-react';
import { ELEMENT_DATATYPE } from '../constants';
import { Context, RootMouseMoveEvent, SelectionEvents } from '../types';

export const useElementSelection = ({
  events,
  internalEvents,
  internalState: { isDnd },
}: Context) => {
  const currentHover = useRef<string>('');

  const setHover = useCallback(
    (payload: string) => {
      events.next({ type: 'MouseEnter', payload });
      currentHover.current = payload;
    },
    [events]
  );
  const clearHover = useCallback(() => {
    events.next({ type: 'MouseLeave', payload: null });
    currentHover.current = '';
  }, [events]);

  const onClick = useCallback(() => {
    events.next(
      match<string, SelectionEvents>(currentHover.current)
        .with('', () => ({ type: 'ElementUnselected', payload: null }))
        .otherwise((payload) => ({ type: 'ElementSelected', payload }))
    );
  }, [events]);

  const onMouseMove = useCallback(
    ({ payload }: RootMouseMoveEvent) => {
      const value = (payload.target as Element).closest(
        `[datatype=${ELEMENT_DATATYPE}]`
      )?.id;

      match(value)
        .with(P.nullish, clearHover)
        .with(P.string, (value) =>
          match(value).with(currentHover.current, noop).otherwise(setHover)
        )
        .exhaustive();
    },
    [setHover, clearHover]
  );

  useSubscription(() =>
    internalEvents
      .pipe(filter(() => !isDnd.value))
      .subscribe((event) =>
        match(event)
          .with({ type: 'RootMouseMove' }, onMouseMove)
          .with({ type: 'RootClick' }, onClick)
          .with({ type: 'RootMouseLeave' }, clearHover)
          .otherwise(noop)
      )
  );
};
