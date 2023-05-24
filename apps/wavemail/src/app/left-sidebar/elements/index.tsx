import { map } from 'rxjs';
import { useObservable } from '@waveditors/rxjs-react';
import { useMailBuilderContext } from '../../common/hooks';
import { ElementEditor } from './element-editor';
import { CreateElement } from './create-element';

export const Elements = () => {
  const {
    stores: { selected, elements },
  } = useMailBuilderContext();
  const element = useObservable(
    selected.bs.pipe(
      map((selected) => (selected ? elements.bs.value[selected] : null))
    ),
    null,
    [selected.bs]
  );
  return element ? <ElementEditor element={element} /> : <CreateElement />;
};
