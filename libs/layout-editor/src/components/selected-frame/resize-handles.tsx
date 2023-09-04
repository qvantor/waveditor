import styled from 'styled-components';
import { theme } from '@waveditors/theme';
import {
  Fragment,
  MouseEvent as ReactMouseEvent,
  useMemo,
  useCallback,
} from 'react';
import {
  fromEvent,
  map,
  filter,
  take,
  takeUntil,
  takeLast,
  BehaviorSubject,
  delay,
} from 'rxjs';
import { useObservable } from '@waveditors/rxjs-react';
import {
  Align,
  Element,
  ElementStore,
  getElementPosition,
  getParentElement,
  useBuilderContext,
  typeToDimensions,
  Dimensions,
} from '@waveditors/editor-model';
import { addPx, getXPadding, getYPadding } from '@waveditors/utils';
import { useLayoutEditorContext } from '../../hooks';
import { COLUMN_DATATYPE } from '../../constants';

const Handle = styled.div`
  position: absolute;
  border: 1px solid ${theme.color.surface.accent};
  background: ${theme.color.surface.secondary};
  pointer-events: all;
`;
const HandleX = styled(Handle)`
  top: 50%;
  transform: translateY(-50%);
  height: 10px;
  width: 4px;
  cursor: ew-resize;
`;
const HandleY = styled(Handle)`
  left: 50%;
  transform: translateX(-50%);
  height: 4px;
  width: 10px;
  cursor: ns-resize;
`;
const HandleRight = styled(HandleX)`
  right: -2px;
`;
const HandleLeft = styled(HandleX)`
  left: -2px;
`;
const HandleBottom = styled(HandleY)`
  bottom: -2px;
`;

export interface Sizes {
  width: number;
  height: number;
  left: number;
}

interface Props {
  element: ElementStore;
  width: number;
  height: number;
  left: number;
  setPreviewSize: (size: Sizes | null) => void;
}

type Controls = 'l' | 'r' | 'b';
const controlToDimensions = (control: Controls): Dimensions => {
  switch (control) {
    case 'b':
      return 'h';
    case 'l':
    case 'r':
      return 'w';
  }
};
const calcNewLeft = (align: Align, left: number, diff: number) => {
  switch (align) {
    case 'right':
      return left - diff;
    case 'center':
      return left - diff / 2;
    case 'left':
      return left;
  }
};

export const ResizeHandles = ({
  width,
  height,
  left,
  setPreviewSize,
  element,
}: Props) => {
  const {
    model: { elements },
  } = useBuilderContext();
  const {
    iFrameDocument,
    internalState: { isInteractive },
  } = useLayoutEditorContext();
  const maxWidth = useObservable(
    // calc parent column width as maxWidth
    (element.bs as BehaviorSubject<Element>).pipe(
      map((value) => iFrameDocument.getElementById(value.id)),
      filter(Boolean),
      map((element) => element.closest(`[datatype=${COLUMN_DATATYPE}]`)),
      filter(Boolean),
      map((parentCol) => parentCol.getBoundingClientRect().width)
    ),
    0,
    [element]
  );
  const columnAlign = useObservable(
    (element.bs as BehaviorSubject<Element>).pipe(
      map((element) => {
        const parent = getParentElement(elements.getValue(), element.id);
        if (!parent) return 'left';
        const parentElement = parent.getValue();
        const position = getElementPosition(parentElement, element.id);
        return (
          (parentElement.params.columns[position.column].style?.textAlign ||
            parentElement.style.textAlign) ??
          'left'
        );
      })
    ),
    'left',
    [element]
  );
  const controls = useMemo(
    () => typeToDimensions(element.getValue().type),
    [element]
  );
  const onMouseDown = (control: Controls) => (e: ReactMouseEvent) => {
    e.stopPropagation();
    const direction = controlToDimensions(control);
    const prevX = e.clientX;
    const prevY = e.clientY;
    const paddingX = getXPadding(element.getValue().style.padding);
    const paddingY = getYPadding(element.getValue().style.padding);
    const size = { width, height, left };
    setPreviewSize(size);
    isInteractive.next(false);
    const mouseUp = fromEvent(iFrameDocument, 'mouseup').pipe(take(1));
    const mouseMove = fromEvent<MouseEvent>(iFrameDocument, 'mousemove').pipe(
      takeUntil(mouseUp),
      map((e) => {
        if (direction === 'h')
          return {
            left,
            width,
            height: Math.round(
              Math.max(height + (e.clientY - prevY), paddingY + 4)
            ),
          };
        const directionModifier = control === 'r' ? 1 : -1;
        const newWidth = Math.round(
          Math.min(
            Math.max(
              width + (e.clientX - prevX) * directionModifier,
              paddingX + 4
            ),
            maxWidth
          )
        );
        const diff = newWidth - width;
        return {
          width: newWidth,
          left: calcNewLeft(columnAlign, left, diff),
          height,
        };
      })
    );
    mouseMove.subscribe(setPreviewSize);

    // get computation results from last move event
    const lastMove = mouseMove.pipe(takeLast(1));
    lastMove.subscribe(({ width, height }) => {
      element.actions.setStyle(
        direction === 'w'
          ? { key: 'width', value: addPx(width - paddingX) }
          : { key: 'height', value: addPx(height - paddingY) }
      );
      setPreviewSize(null);
    });
    // make interactive with small delay (to avoid onClick)
    lastMove.pipe(delay(1)).subscribe(() => isInteractive.next(true));
  };
  const onClick = useCallback(
    (e: ReactMouseEvent) => {
      e.stopPropagation();
      setPreviewSize(null);
      isInteractive.next(true);
    },
    [setPreviewSize, isInteractive]
  );
  return (
    <>
      {controls.map((direction) => {
        switch (direction) {
          case 'h':
            return (
              width >= 15 && (
                <HandleBottom
                  onMouseDown={onMouseDown('b')}
                  onClick={onClick}
                  key='h'
                />
              )
            );
          case 'w': {
            if (height < 15) return null;
            switch (columnAlign) {
              case 'left':
                return (
                  <HandleRight
                    onMouseDown={onMouseDown('r')}
                    onClick={onClick}
                    key='w'
                  />
                );
              case 'center':
                return (
                  <Fragment key='w'>
                    <HandleRight
                      onMouseDown={onMouseDown('r')}
                      onClick={onClick}
                    />
                    <HandleLeft
                      onMouseDown={onMouseDown('l')}
                      onClick={onClick}
                    />
                  </Fragment>
                );
              case 'right':
                return (
                  <HandleLeft
                    onMouseDown={onMouseDown('l')}
                    onClick={onClick}
                    key='w'
                  />
                );
            }
          }
        }
      })}
    </>
  );
};
