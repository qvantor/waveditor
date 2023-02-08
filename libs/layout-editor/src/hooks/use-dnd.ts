import { useSubscription } from '@waveditors/rxjs-react';
import { filter, noop } from 'rxjs';
import { match, P } from 'ts-pattern';
import { returnValue } from '@waveditors/utils';
import { LayoutStore } from '@waveditors/editor-model';
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
        document.addEventListener('mousemove', mouseMove);

        document.addEventListener('mouseup', () => {
          if (dndPreview.value)
            events.next({
              type: 'LinkElementToLayout',
              payload: dndPreview.value,
            });
          console.log(dndPreview.value);

          isDnd.next(false);
          dndPreview.next(null);
          document.removeEventListener('mousemove', mouseMove);
        });
      })
  );
};
