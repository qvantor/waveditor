import { BehaviorSubject, map } from 'rxjs';
import styled from 'styled-components';
import { Element, ElementStore } from '@waveditors/editor-model';
import { useObservable } from '@waveditors/rxjs-react';
import { font } from '@waveditors/theme';
import { PaddingEditor, BackgroundEditor } from './components';

interface Props {
  element: ElementStore;
}

const Root = styled.div`
  ${font({ size: 'small' })}
`;

export const StyleEditor = ({ element }: Props) => {
  const style = useObservable(
    (element.bs as BehaviorSubject<Element>).pipe(map((value) => value.style)),
    {},
    [element]
  );
  return (
    <Root>
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
    </Root>
  );
};
