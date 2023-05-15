import { useRenderContext } from '@waveditors/layout-render';
import { useObservable } from '@waveditors/rxjs-react';
import { map, switchMap, of, merge } from 'rxjs';
import { getElementById } from '@waveditors/editor-model';
import { match, P } from 'ts-pattern';
import { useLayoutEditorContext } from './use-layout-editor-context';

export const useSelectedElement = () => {
  const { elements } = useRenderContext();
  const { selected } = useLayoutEditorContext();
  return useObservable(
    merge(selected, elements).pipe(
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
