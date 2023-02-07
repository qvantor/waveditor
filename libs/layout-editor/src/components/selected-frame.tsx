import styled from 'styled-components';
import { AiOutlineDrag } from 'react-icons/ai';
import { useCallback } from 'react';
import { mapValue } from '@waveditors/utils';
import { useObservable } from '@waveditors/rxjs-react';
import { delay, map, mergeWith } from 'rxjs';
import { elementIdToDOMRect } from '../services';
import { useLayoutEditorContext } from '../hooks';
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
  const { selected, internalEvents, internalState } = useLayoutEditorContext();
  const selectedToRect = useCallback(
    (selected: string | null) => mapValue(selected, elementIdToDOMRect),
    []
  );
  const rect = useObservable(
    selected.pipe(
      mergeWith(internalState.isDnd.pipe(delay(16))),
      map(() => selected.value)
    ),
    selected.value,
    selectedToRect
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
