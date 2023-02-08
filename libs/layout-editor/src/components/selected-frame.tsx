import styled from 'styled-components';
import { AiOutlineDrag } from 'react-icons/ai';
import { useObservable } from '@waveditors/rxjs-react';
import { map, filter, switchMap } from 'rxjs';
import { notNullish } from '@waveditors/utils';
import { useLayoutEditorContext } from '../hooks';
import { resizeObservable } from '../services';
import { FrameRoot } from './hover-frame';

const SelectedRect = styled(FrameRoot)`
  background: transparent;
  outline: 2px solid rgba(41, 128, 185, 1);
`;

const DragIcon = styled(AiOutlineDrag)`
  background: white;
  font-size: 10px;
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translate(-50%, 0);
  cursor: move;
  pointer-events: all;
`;

export const SelectedFrame = () => {
  const { selected, internalEvents, root } = useLayoutEditorContext();
  const rect = useObservable(
    selected.pipe(
      filter((selected) => selected !== root),
      filter(notNullish),
      map((value) => document.getElementById(value)),
      filter(notNullish),
      switchMap(resizeObservable)
    ),
    null
  );
  if (!rect) return null;

  const { left, top, width, height } = rect;
  return (
    <SelectedRect style={{ left, top, width, height }}>
      <DragIcon
        onMouseDown={() =>
          internalEvents.next({
            type: 'DragIconMouseDown',
            payload: selected.getValue() as string,
          })
        }
      />
    </SelectedRect>
  );
};
