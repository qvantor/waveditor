import { useSubscription } from '@waveditors/rxjs-react';
import { filter, noop } from 'rxjs';
import { match, P } from 'ts-pattern';
import { mapValue, returnValue } from '@waveditors/utils';
import {
  getElementParent,
  getElementPosition,
  LayoutStore,
} from '@waveditors/editor-model';
import { COLUMN_DATATYPE, ELEMENT_DATATYPE } from '../constants';
import { Context, DragIconMouseDownEvent } from '../types';

export const useDnd = ({
  elements,
  internalEvents,
  internalState: { isDnd, dndPreview },
  events,
}: Context) => {
  useSubscription(() =>
    internalEvents
      .pipe(
        filter(
          (event): event is DragIconMouseDownEvent =>
            event.type === 'DragIconMouseDown'
        )
      )
      .subscribe(({ payload: id }) => {
        isDnd.next(true);
        const position = mapValue(
          getElementParent(elements.getValue(), id),
          (parent) => getElementPosition(parent.getValue(), id)
        );
        events.next({ type: 'UnlinkElementFromLayout', payload: id });

        const mouseMove = (e: MouseEvent) => {
          const column = (e.target as HTMLElement).closest(
            `[datatype=${COLUMN_DATATYPE}]`
          );
          const layout = column?.closest(`[datatype=${ELEMENT_DATATYPE}]`);
          const event = match([layout, column])
            .with(P.array(P.not(P.nullish)), ([layout, column]) => {
              const columnIndex = Number(column.getAttribute('data-column'));
              if (Number.isNaN(columnIndex)) return null;
              const element = elements.getValue()[layout.id] as LayoutStore;
              const diffCenter = element
                .getValue()
                .params.columns[columnIndex].map((id) => {
                  const htmlChild = document.getElementById(id);
                  if (!htmlChild) return null;
                  const { top, height } = htmlChild.getBoundingClientRect();

                  const center = top + height / 2;
                  return e.clientY - center;
                });
              const { index, next } = diffCenter.reduce(
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
                element: id,
                position: {
                  layout: layout.id,
                  column: columnIndex,
                  index,
                  next,
                },
              };
            })
            .otherwise(returnValue(null));
          match(event)
            .with(dndPreview.value, noop)
            .otherwise((value) => dndPreview.next(value));
        };
        const mouseUp = () => {
          const payload = match(dndPreview.value)
            .with(P.nullish, () =>
              position ? { element: id, position, samePosition: true } : null
            )
            .with(
              {
                position: {
                  layout: position?.layout,
                  column: position?.column,
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

          if (payload) events.next({ type: 'LinkElementToLayout', payload });

          isDnd.next(false);
          dndPreview.next(null);
          document.removeEventListener('mousemove', mouseMove);
          document.removeEventListener('mouseup', mouseUp);
        };

        document.addEventListener('mousemove', mouseMove);

        document.addEventListener('mouseup', mouseUp);
      })
  );
};
