import { useMemo } from 'react';
import { match } from 'ts-pattern';
import { map, distinctUntilChanged } from 'rxjs';
import { useObservable } from '@waveditors/rxjs-react';
import { elementSelector, getElementById } from '@waveditors/editor-model';
import { ELEMENT_DATATYPE } from '../../constants';
import { useLayoutEditorContext, useModelContext } from '../../hooks';
import { Layout } from './layout';
import { Text } from './text';
import { Image } from './image';

interface Props {
  id: string;
  width: number;
}

export const Element = ({ id, width }: Props) => {
  const { elements } = useModelContext();
  const { selected } = useLayoutEditorContext();
  const isSelected = useObservable(
    selected.pipe(
      map((value) => value === id),
      distinctUntilChanged()
    ),
    false
  );
  const element = useMemo(
    () => getElementById(id)(elements.value),
    [id, elements]
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
