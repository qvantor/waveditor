import { map } from 'rxjs';
import { useObservable } from '@waveditors/rxjs-react';
import { useBuilderContext } from '@waveditors/editor-model';
import { Hider } from '../../../common/components';
import { CreateItem } from '../create-item';
import { ElementEditor } from './element-editor';

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
  return (
    <>
      {element && <ElementEditor element={element} />}
      <Hider isHidden={Boolean(element)}>
        <CreateItem />
      </Hider>
    </>
  );
};
