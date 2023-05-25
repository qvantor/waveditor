import { useObservable } from '@waveditors/rxjs-react';
import { map, merge, of, switchMap } from 'rxjs';
import { match, P } from 'ts-pattern';
import { getElementById } from '../../elements';
import { useBuilderContext } from '../../builder';

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
