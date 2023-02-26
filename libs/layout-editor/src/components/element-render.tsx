import { useMemo } from 'react';
import { match } from 'ts-pattern';
import { map, distinctUntilChanged } from 'rxjs';
import { useObservable } from '@waveditors/rxjs-react';
import { ElementType } from '@waveditors/editor-model';
import { ELEMENT_DATATYPE } from '../constants';
import { useLayoutEditorContext } from '../hooks';
import { LayoutRender } from './layout-render';
import { TextRender } from './text-render';
import { ImageRender } from './image-render';

interface Props {
  id: string;
  width: number;
}

const typeSelector = <T extends ElementType>(type: T) => ({
  bs: { value: { type } },
});
const ElementRenderSwitch = ({ id, width }: Props) => {
  const { elements, selected } = useLayoutEditorContext();
  const isSelected = useObservable(
    selected.pipe(
      map((value) => value === id),
      distinctUntilChanged()
    ),
    false
  );
  const element = useMemo(() => elements.value[id], [id, elements]);
  return match(element)
    .with(typeSelector('layout'), (element) => (
      <LayoutRender element={element} width={width} />
    ))
    .with(typeSelector('text'), (element) => (
      <TextRender selected={isSelected} element={element} />
    ))
    .with(typeSelector('image'), (element) => <ImageRender element={element} />)
    .exhaustive();
};

export const ElementRender = ({ id, width }: Props) => (
  <div id={id} datatype={ELEMENT_DATATYPE} style={{ width }}>
    <ElementRenderSwitch id={id} width={width} />
  </div>
);
