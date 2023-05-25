import { useObservable } from '@waveditors/rxjs-react';
import { map, switchMap, of, merge } from 'rxjs';
import { getElementById, useBuilderContext } from '@waveditors/editor-model';
import { match, P } from 'ts-pattern';

export const useSelectedElement = () => {
  const {
    model: { elements },
    interaction: { selected },
  } = useBuilderContext();
  return useObservable(
    merge(selected.bs, elements.bs).pipe(
      switchMap(() =>
        match(selected.getValue())
          .with(P.string, (id) =>
            of(getElementById(id)).pipe(
              map((getElement) => getElement(elements.getValue())),
              switchMap((elementStore) =>
                elementStore ? elementStore.bs : of(null)
              )
            )
          )
          .otherwise(() => of(null))
      )
    ),
    null,
    [selected, elements]
  );
};
