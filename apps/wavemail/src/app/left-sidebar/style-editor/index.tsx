import { BehaviorSubject, map } from 'rxjs';
import { Element, ElementStore } from '@waveditors/editor-model';
import { useObservable } from '@waveditors/rxjs-react';
import { PaddingEditor } from './components';

interface Props {
  element: ElementStore;
}

export const StyleEditor = ({ element }: Props) => {
  const style = useObservable(
    (element.bs as BehaviorSubject<Element>).pipe(map((value) => value.style)),
    {},
    [element]
  );
  return (
    <div>
      <PaddingEditor
        value={style.padding}
        onChange={(value) => {
          element.actions.setStyle({ key: 'padding', value });
        }}
      />
    </div>
  );
};
