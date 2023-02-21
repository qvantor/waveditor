import { useObservable } from '@waveditors/rxjs-react';
import styled from 'styled-components';
import { map, switchMap, merge, of } from 'rxjs';
import { resizeObservable } from '../services';
import { useLayoutEditorContext } from '../hooks';

export const FrameRoot = styled.div`
  position: absolute;
  pointer-events: none;
  background: rgba(39, 174, 96, 0.3);
  outline: 2px solid rgba(39, 174, 96, 1);
  outline-offset: -2px;
`;

export const HoverFrame = () => {
  const { hover, selected } = useLayoutEditorContext();

  const rect = useObservable(
    merge(hover, selected).pipe(
      map(() => hover.getValue()),
      switchMap((value) => {
        if (value === null || value === selected.getValue()) return of(null);
        const element = document.getElementById(value);
        if (!element) return of(null);
        return resizeObservable(element);
      })
    ),
    null
  );

  if (!rect) return null;

  return <FrameRoot style={{ ...rect }} />;
};
