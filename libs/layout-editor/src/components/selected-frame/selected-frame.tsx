import styled from 'styled-components';
import { useObservable } from '@waveditors/rxjs-react';
import { delay, filter, map, of, switchMap } from 'rxjs';
import { theme } from '@waveditors/theme';
import { match, P } from 'ts-pattern';
import { useBuilderContext } from '@waveditors/editor-model';
import { useLayoutEditorContext } from '../../hooks';
import { resizeObservable } from '../../services';
import { FrameRoot } from '../hover-frame';
import { FrameControl } from './frame-control';
import { InnerFrame } from './inner-frame';

const SelectedRect = styled(FrameRoot)`
  background: transparent;
  outline: 2px solid ${theme.color.surface.accent};
`;

export const SelectedFrame = () => {
  const {
    interaction: { selected },
  } = useBuilderContext();
  const { iFrameDocument } = useLayoutEditorContext();
  const rect = useObservable(
    selected.bs.pipe(
      switchMap((value) =>
        match(value)
          .with(P.string, (id) =>
            of(id).pipe(
              // when added and selected new component, wait 1ms for element to appear
              // possible better solution with MutationObserver, but this simple and works
              delay(1),
              map((value) => iFrameDocument.getElementById(value)),
              filter(Boolean),
              switchMap((element) => resizeObservable(element, iFrameDocument))
            )
          )
          .otherwise(() => of(null))
      )
    ),
    null,
    [selected]
  );

  if (!rect) return null;

  const { left, top, width, height } = rect;
  return (
    <SelectedRect style={{ left, top, width, height }}>
      <InnerFrame />
      <FrameControl top={top} width={width} />
    </SelectedRect>
  );
};
