import styled from 'styled-components';
import { AiOutlineDrag } from 'react-icons/ai';
import { useObservable } from '@waveditors/rxjs-react';
import { switchMap, of } from 'rxjs';
import { useCallback } from 'react';
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
  const { selected, internalEvents } = useLayoutEditorContext();
  const rect = useObservable(
    selected.pipe(
      switchMap((value) => {
        if (!value) return of(null);
        const element = document.getElementById(value);
        if (!element) return of(null);
        return resizeObservable(element);
      })
    ),
    null
  );
  const onMouseDown = useCallback(() => {
    const payload = selected.getValue();
    if (!payload) return console.error('DragIconMouseDown selected is empty');
    internalEvents.next({ type: 'DragIconMouseDown', payload });
  }, [internalEvents, selected]);
  if (!rect) return null;

  const { left, top, width, height } = rect;
  return (
    <SelectedRect style={{ left, top, width, height }}>
      <DragIcon onMouseDown={onMouseDown} />
    </SelectedRect>
  );
};
