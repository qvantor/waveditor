import { useSubscription } from '@waveditors/rxjs-react';
import { filter, fromEvent, map, Subscription, take, tap } from 'rxjs';
import { match, P } from 'ts-pattern';
import {
  mapValue,
  notNullish,
  returnValue,
  selectByType,
} from '@waveditors/utils';
import {
  ElementsStore,
  getParentElement,
  getElementPosition,
  LayoutAddChild,
  LayoutStore,
} from '@waveditors/editor-model';
import { useCallback, useRef } from 'react';
import { RenderContext } from '@waveditors/layout-render';
import { COLUMN_DATATYPE, ELEMENT_DATATYPE } from '../constants';
import { Context } from '../types';

const detectMousePosition =
  (elements: ElementsStore['bs'], iFrameDocument: Document = document) =>
  (e: MouseEvent) => {
    const column = (e.target as HTMLElement).closest(
      `[datatype=${COLUMN_DATATYPE}]`
    );
    const layout = column?.closest(`[datatype=${ELEMENT_DATATYPE}]`);
    if (!column || !layout) return null;
    const columnIndex = Number(column.getAttribute('data-column'));
    if (Number.isNaN(columnIndex)) return null;
    const element = elements.getValue()[layout.id] as LayoutStore;
    const { index, next } = element
      .getValue()
      .params.columns[columnIndex].map((id) => {
        const htmlChild = iFrameDocument.getElementById(id);
        if (!htmlChild) return null;
        const { top, height } = htmlChild.getBoundingClientRect();

        const center = top + height / 2;
        return e.clientY - center;
      })
      .reduce(
        (sum, diff, index) => {
          if (diff && Math.abs(diff) < sum.min)
            return {
              min: Math.abs(diff),
              index,
              next: diff > 0,
            };
          return sum;
        },
        { min: Infinity, index: 0, next: false }
      );
    return {
      layout: layout.id,
      column: columnIndex,
      index,
      next,
    };
  };

const positionsToLinkElementToLayout = (
  id: string,
  newPos: LayoutAddChild | null,
  prev: LayoutAddChild['position'] | null
) =>
  match(newPos)
    .with(P.nullish, () =>
      prev ? { element: id, position: prev, samePosition: true } : null
    )
    .with(
      {
        position: {
          layout: prev?.layout,
          column: prev?.column,
        },
      },
      (value) => ({
        ...value,
        samePosition: true,
      })
    )
    .otherwise((value) => ({
      ...value,
      samePosition: false,
    }));

export const useDnd = (
  {
    internalEvents,
    internalState: { isDnd, dndPreview },
    externalEvents,
    events,
    iFrameDocument,
  }: Context,
  { elements }: RenderContext
) => {
  const mouseMoveSubscription = useRef<Subscription | null>(null);
  const mouseUpSubscription = useRef<Subscription | null>(null);
  const dndCleanup = useCallback(
    (mouseUp = false) => {
      isDnd.next(false);
      dndPreview.next(null);
      mouseMoveSubscription.current?.unsubscribe();
      if (mouseUp) mouseUpSubscription.current?.unsubscribe();
    },
    [isDnd, dndPreview]
  );
  const createMouseMoveSubscription = useCallback(
    (element: string) =>
      fromEvent<MouseEvent>(iFrameDocument, 'mousemove')
        .pipe(
          map(detectMousePosition(elements, iFrameDocument)),
          map((position) => {
            if (!position) return position;
            return {
              element,
              position,
            };
          }),
          filter((e) =>
            match(e)
              .with(dndPreview.value, returnValue(false))
              .otherwise(returnValue(true))
          )
        )
        .subscribe(dndPreview.next.bind(dndPreview)),
    [dndPreview, elements, iFrameDocument]
  );
  const mouseUpObs = useCallback(
    () =>
      fromEvent(iFrameDocument, 'mouseup').pipe(
        map(() => dndPreview.getValue()),
        tap(() => dndCleanup()),
        take(1)
      ),
    [dndCleanup, dndPreview, iFrameDocument]
  );
  useSubscription(() =>
    internalEvents
      .pipe(filter(selectByType('RootMouseLeave')))
      .subscribe(() => dndCleanup(true))
  );
  useSubscription(() =>
    internalEvents
      .pipe(filter(selectByType('DragIconMouseDown')))
      .subscribe(({ payload: id }) => {
        isDnd.next(true);
        const position = mapValue(
          getParentElement(elements.getValue(), id),
          (parent) => getElementPosition(parent.getValue(), id)
        );
        events.next({ type: 'UnlinkElementFromLayout', payload: id });

        mouseMoveSubscription.current = createMouseMoveSubscription(id);
        mouseUpSubscription.current = mouseUpObs()
          .pipe(
            map((value) => positionsToLinkElementToLayout(id, value, position)),
            filter(notNullish)
          )
          .subscribe((payload) =>
            events.next({ type: 'LinkElementToLayout', payload })
          );
      })
  );
  useSubscription(() =>
    externalEvents
      .pipe(filter(selectByType('OutsideDragStarted')))
      .subscribe(({ payload: element }) => {
        isDnd.next(true);

        mouseMoveSubscription.current = createMouseMoveSubscription(element.id);
        mouseUpSubscription.current = mouseUpObs()
          .pipe(filter(notNullish))
          .subscribe((position) =>
            events.next({
              type: 'AddElement',
              payload: { element, position },
            })
          );
      })
  );
};
