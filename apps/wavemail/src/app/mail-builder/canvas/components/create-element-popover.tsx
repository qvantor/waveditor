import {
  ElementType,
  ShowAddElementControlEvent,
  useBuilderContext,
} from '@waveditors/editor-model';
import { useSubscription } from '@waveditors/rxjs-react';
import { filter, tap, delay, merge, fromEvent } from 'rxjs';
import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Popover } from 'antd';
import { CreateElement } from '../../common/components';
import { useTypeToElement } from '../../common/hooks';

const Root = styled.div`
  position: absolute;
`;

export const CreateElementPopover = () => {
  const [state, setState] = useState<
    ShowAddElementControlEvent['payload'] | null
  >(null);
  const {
    editor: { events },
  } = useBuilderContext();
  const typeToElement = useTypeToElement();
  // show popover on ShowAddElementControl event
  useSubscription(
    () =>
      events
        .pipe(
          filter(
            (event): event is ShowAddElementControlEvent =>
              event.type === 'ShowAddElementControl'
          ),
          // cleanup state to update popover position
          tap(() => setState(null)),
          delay(1)
        )
        .subscribe((event) => setState(event.payload)),
    [events]
  );
  // hide popover
  useSubscription(
    () =>
      merge(
        // on click inside canvas, or scroll
        events.pipe(
          filter(({ type }) =>
            ['ElementSelected', 'ElementUnselected', 'CanvasScroll'].includes(
              type
            )
          )
        ),
        // on click inside main app
        fromEvent(document, 'click')
      )
        .pipe(filter(() => state !== null))
        .subscribe(() => setState(null)),
    [state, events]
  );
  const onElementClick = useCallback(
    (type: ElementType) => {
      if (!state) return;
      const element = typeToElement(type);
      events.next({
        type: 'AddElement',
        payload: { element, position: state.elementPosition },
      });
    },
    [state, events, typeToElement]
  );
  if (!state) return null;
  return (
    <Popover
      content={<CreateElement onClick={onElementClick} />}
      open={true}
      placement='bottom'
    >
      <Root style={state?.controlPosition} />
    </Popover>
  );
};
