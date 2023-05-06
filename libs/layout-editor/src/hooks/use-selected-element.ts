import { useRenderContext } from '@waveditors/layout-render';
import { useObservable } from '@waveditors/rxjs-react';
import { filter, map, switchMap } from 'rxjs';
import { getElementById } from '@waveditors/editor-model';
import { useLayoutEditorContext } from './use-layout-editor-context';

export const useSelectedElement = () => {
  const { elements } = useRenderContext();
  const { selected } = useLayoutEditorContext();
  return useObservable(
    selected.pipe(
      filter(Boolean),
      map(getElementById),
      switchMap((fn) => fn(elements.getValue()).bs)
    ),
    null,
    [selected, elements]
  );
};
