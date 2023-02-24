import { BehaviorSubject, map } from 'rxjs';
import { Element, ElementStore } from '@waveditors/editor-model';
import { useObservable } from '@waveditors/rxjs-react';
import { PaddingEditor, BackgroundEditor } from './components';

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
      <BackgroundEditor
        value={{
          backgroundColor: style.backgroundColor,
          backgroundImage: style.backgroundImage,
          backgroundPosition: style.backgroundPosition,
          backgroundRepeat: style.backgroundRepeat,
          backgroundSize: style.backgroundSize,
          backgroundOrigin: style.backgroundOrigin,
        }}
        onChange={element.actions.setStyle}
      />
    </div>
  );
};
