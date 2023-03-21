import styled from 'styled-components';
import { AiOutlineDrag } from 'react-icons/ai';
import { useObservable } from '@waveditors/rxjs-react';
import { switchMap, of, map, debounceTime } from 'rxjs';
import { useCallback } from 'react';
import { theme } from '@waveditors/theme';
import { useLayoutEditorContext } from '../hooks';
import { resizeObservable } from '../services';
import { useIframeContext } from '../iframe';
import { FrameRoot } from './hover-frame';

const SelectedRect = styled(FrameRoot)`
  background: transparent;
  outline: 2px solid ${theme.color.surface.accent};
  z-index: 1;
`;

const DragIcon = styled(AiOutlineDrag)`
  background: ${theme.color.surface.secondary};
  font-size: 10px;
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translate(-50%, 0);
  cursor: move;
  pointer-events: all;
`;

export const SelectedFrame = () => {
  const { selected, internalEvents, config } = useLayoutEditorContext();
  const iFrameDocument = useIframeContext();
  const rect = useObservable(
    selected.pipe(
      debounceTime(16),
      switchMap((value) => {
        if (!value) return of(null);
        const element = iFrameDocument.getElementById(value);
        if (!element) return of(null);
        return resizeObservable(element, iFrameDocument);
      }),
      map((value) => {
        if (!value) return null;
        return [value, selected.getValue()] as const;
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

  const [{ left, top, width, height }, selectedId] = rect;
  return (
    <SelectedRect style={{ left, top, width, height }}>
      {selectedId !== config.getValue().rootElementId && (
        <DragIcon onMouseDown={onMouseDown} />
      )}
    </SelectedRect>
  );
};
