import styled from 'styled-components';
import { useObservable } from '@waveditors/rxjs-react';
import { delay, filter, map, of, switchMap } from 'rxjs';
import { theme, font } from '@waveditors/theme';
import { match, P } from 'ts-pattern';
import { isLayoutStore, useBuilderContext } from '@waveditors/editor-model';
import { useState } from 'react';
import { useLayoutEditorContext } from '../../hooks';
import { resizeObservable } from '../../services';
import { FrameRoot } from '../hover-frame';
import { FrameControl } from './frame-control';
import { InnerFrame } from './inner-frame';
import { ResizeHandles } from './resize-handles';
import { AddLayoutSibling } from './add-layout-sibling';

const SelectedRect = styled(FrameRoot)`
  background: transparent;
  outline: 2px solid ${theme.color.surface.accent};
`;
const SizePreview = styled.div`
  position: absolute;
  right: 0;
  bottom: -16px;
  height: 16px;
  padding: 0 2px;
  background: ${theme.color.surface.accent};
  color: ${theme.color.text.tertiary};
  ${font({ type: 'paragraph', size: 'smallest' })}
`;

export const SelectedFrame = () => {
  const [previewSize, setPreviewSize] = useState<{
    width: number;
    height: number;
    left: number;
  } | null>(null);
  const {
    interaction: { selected },
    model: { elements },
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
  const element = useObservable(
    selected.bs.pipe(
      map((selected) => (selected ? elements.bs.value[selected] : null))
    ),
    null,
    [selected.bs]
  );

  if (!rect || !element) return null;

  const { left, top, width, height } = rect;
  const resultLeft = previewSize ? previewSize.left : left;
  const resultWidth = previewSize ? previewSize.width : width;
  const resultHeight = previewSize ? previewSize.height : height;
  return (
    <SelectedRect
      style={{
        left: resultLeft,
        top,
        width: resultWidth,
        height: resultHeight,
      }}
    >
      <InnerFrame />
      <FrameControl top={top} width={width} />
      {isLayoutStore(element) && !previewSize && (
        <AddLayoutSibling element={element} />
      )}
      <ResizeHandles
        left={left}
        width={width}
        height={height}
        setPreviewSize={setPreviewSize}
        element={element}
      />
      {previewSize && (
        <SizePreview>
          {previewSize.width}x{previewSize.height}
        </SizePreview>
      )}
    </SelectedRect>
  );
};
