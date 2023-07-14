import { map } from 'rxjs';
import { useObservable } from '@waveditors/rxjs-react';
import { useBuilderContext } from '@waveditors/editor-model';
import { ElementEditor } from './element-editor';
import { CreateElement } from './create-element';

export const Elements = () => {
  const {
    model: { elements },
    interaction: { selected },
  } = useBuilderContext();
  const element = useObservable(
    selected.bs.pipe(
      map((selected) => (selected ? elements.bs.value[selected] : null))
    ),
    null,
    [selected.bs]
  );
  return element ? <ElementEditor element={element} /> : <CreateElement />;
};
