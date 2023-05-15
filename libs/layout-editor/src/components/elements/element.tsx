import { match } from 'ts-pattern';
import { map } from 'rxjs';
import { useBsSelector, useObservable } from '@waveditors/rxjs-react';
import { elementSelector, getElementById } from '@waveditors/editor-model';
import { useRenderContext } from '@waveditors/layout-render';
import { ELEMENT_DATATYPE } from '../../constants';
import { useLayoutEditorContext } from '../../hooks';
import { Layout } from './layout';
import { Text } from './text';
import { Image } from './image';

interface Props {
  id: string;
  width: number;
}

export const Element = ({ id, width }: Props) => {
  const { elements } = useRenderContext();
  const { selected } = useLayoutEditorContext();
  const isSelected = useBsSelector(selected, (value) => value === id);
  const element = useObservable(
    elements.pipe(map(getElementById(id))),
    getElementById(id)(elements.getValue()),
    [id]
  );
  const attributes = { id, datatype: ELEMENT_DATATYPE };
  return match(element)
    .with(elementSelector('layout'), (element) => (
      <Layout element={element} width={width} attributes={attributes} />
    ))
    .with(elementSelector('text'), (element) => (
      <Text selected={isSelected} element={element} attributes={attributes} />
    ))
    .with(elementSelector('image'), (element) => (
      <Image element={element} attributes={attributes} />
    ))
    .exhaustive();
};
