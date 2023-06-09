import { useObservable } from '@waveditors/rxjs-react';
import styled from 'styled-components';
import { map, merge, of, switchMap } from 'rxjs';
import { theme } from '@waveditors/theme';
import { useBuilderContext } from '@waveditors/editor-model';
import { resizeObservable } from '../services';
import { useLayoutEditorContext } from '../hooks';

export const FrameRoot = styled.div`
  position: absolute;
  pointer-events: none;
  outline-offset: -2px;
  outline: 2px solid ${theme.color.surface.accentSecondary};
`;

export const HoverFrame = () => {
  const {
    interaction: { hover, selected },
  } = useBuilderContext();
  const { iFrameDocument } = useLayoutEditorContext();

  const rect = useObservable(
    merge(hover.bs, selected.bs).pipe(
      map(() => hover.getValue()),
      switchMap((value) => {
        if (value === null || value === selected.getValue()) return of(null);
        const element = iFrameDocument.getElementById(value);
        if (!element) return of(null);
        return resizeObservable(element, iFrameDocument);
      })
    ),
    null,
    [hover, selected]
  );
  if (!rect) return null;
  return <FrameRoot style={{ ...rect }} />;
};
