import { useSubscription } from '@waveditors/rxjs-react';
import {
  filter,
  fromEvent,
  map,
  merge,
  Subject,
  Subscription,
  take,
  tap,
} from 'rxjs';
import { match, P } from 'ts-pattern';
import {
  mapValue,
  notNullish,
  returnValue,
  selectByType,
} from '@waveditors/utils';
import {
  ElementsStore,
  getElementPosition,
  getParentElement,
  LayoutAddChild,
  LayoutStore,
  useBuilderContext,
} from '@waveditors/editor-model';
import { useCallback, useRef } from 'react';
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
    const { index } = element
      .getValue()
      .params.columns[columnIndex].children.map((id) => {
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
              index: index + Number(diff > 0),
            };
          return sum;
        },
        { min: Infinity, index: 0 }
      );
    return {
      layout: layout.id,
      column: columnIndex,
      index,
    };
  };

const calculateNewPosition = (
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
          index: prev?.index,
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

export const useDnd = ({
  internalEvents,
  internalState: { isDnd, dndPreview },
  iFrameDocument,
}: Context) => {
  const {
    model: { elements },
    editor: { events, commands },
  } = useBuilderContext();
  // emulate mouseUp in case of mouse move out of iFrameDocument
  const emulateMouseUp = useRef(new Subject());
  const mouseMoveSubscription = useRef<Subscription | null>(null);
  const dndCleanup = useCallback(() => {
    isDnd.next(false);
    dndPreview.next(null);
    mouseMoveSubscription.current?.unsubscribe();
  }, [isDnd, dndPreview]);

  const createMouseMoveSubscription = useCallback(
    (element: string) =>
      fromEvent<MouseEvent>(iFrameDocument, 'mousemove')
        .pipe(
          map(detectMousePosition(elements.bs, iFrameDocument)),
          map((position) => {
            if (!position) return null;
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

  const mouseUpObs = useCallback(() => {
    emulateMouseUp.current = new Subject();
    return merge(
      // mouseup on editor
      fromEvent(iFrameDocument, 'mouseup'),
      // OutsideDragClick means that user made mouseUp outside of editor, without drag an element
      commands.pipe(filter(selectByType('OutsideDragToClick'))),
      // emulating mouseUp if mouse leaving editor
      emulateMouseUp.current
    ).pipe(
      map(() => dndPreview.getValue()),
      tap(() => dndCleanup()),
      take(1)
    );
  }, [dndCleanup, dndPreview, iFrameDocument, commands]);

  // emulate mouseUp on mouse leave
  useSubscription(() =>
    internalEvents
      .pipe(filter(selectByType('RootMouseLeave')))
      .subscribe(() => emulateMouseUp.current.next(null))
  );

  // dnd start on element move
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
        mouseUpObs()
          .pipe(
            map((value) => calculateNewPosition(id, value, position)),
            filter(notNullish)
          )
          .subscribe((payload) =>
            events.next({ type: 'LinkElementToLayout', payload })
          );
      })
  );
  // dnd start on new element from outside
  useSubscription(() =>
    commands
      .pipe(filter(selectByType('OutsideDragStarted')))
      .subscribe(({ payload: element }) => {
        isDnd.next(true);

        mouseMoveSubscription.current = createMouseMoveSubscription(element.id);
        mouseUpObs().subscribe((position) =>
          events.next({
            type: 'AddElement',
            payload: { element, position: position?.position },
          })
        );
      })
  );
};
